import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ColumnDef } from "../crud/model/column-definition";
import { BackendService } from "./backend/backend.service";
import * as _ from "lodash";
import { ColumnsType } from "../crud/model/columns-type";
const clone = require("js.clone");

@Injectable()
export class GetDataFromURIService {

    constructor(public backendService: BackendService) {
    }

    parseLinkProps(columnDefs: ColumnDef[], rowData: any[], columnsType: ColumnsType) {
        let _rowData = clone(rowData),
            obsStore = [Observable.of(true)],
            // get all columns which have the type='Link' or type='Linkset'
            linkColumns: ColumnDef[] = this.getLinksColumns(columnDefs);

        linkColumns.forEach(column => {
            _rowData.forEach(row => {

                obsStore.push(Observable.create(obs => {
                    this.getTitleColumns(column.linkedClass)
                        .subscribe((titleColumns) => {

                            switch (column.type) {
                                case 'Linkset':
                                    this.handlingLinksetType(column, row[column.property], columnsType, titleColumns);
                                    break;

                                case 'Link':
                                    row[column.property] = this.handlingLinkType(column, row[column.property], columnsType, titleColumns);
                                    break;
                                default:
                                    break;
                            }

                            obs.next(true);
                            obs.complete();
                        });
                }));

            });
        });

        return Observable.create(obs => {
            Observable.forkJoin(obsStore)
                .subscribe(() => {
                    obs.next(_rowData);
                    obs.complete();
                });
        });
    }

    handlingLinksetType(column: ColumnDef, rowData: any[], columnsType: ColumnsType, titleColumns: string) {
        if (rowData) {
            rowData.forEach((item, i, arr) => {
                switch (columnsType) {
                    case ColumnsType.Grid:
                        arr[i] = item[titleColumns] || item['id'];
                        break;
                    case ColumnsType.Form:
                        arr[i] = {
                            label: item[titleColumns] || item['id'],
                            value: 'http://localhost:3000/rest/repository/' +
                            column.linkedRepository + '/' + item['id']
                        };
                        break;

                    default:
                        break;
                }
            });
        }
    }

    handlingLinkType(column: ColumnDef, rowData, columnsType: ColumnsType, titleColumns: string) {
        let _rowData = clone(rowData);

        if (_rowData) {
            switch (columnsType) {
                case ColumnsType.Grid:
                    _rowData = _rowData[titleColumns] || _rowData['id'];
                    break;
                case ColumnsType.Form:
                    _rowData = {
                        label: _rowData[titleColumns] || _rowData['id'],
                        value: 'http://localhost:3000/rest/repository/' +
                        column.linkedRepository + '/' + _rowData['id']
                    };

                    break;

                default:
                    break;
            }
        }

        return _rowData;
    }

    /**
     * Gets titleColumns property from crudClassMetaData by class name
     * @param className
     * @returns {any}
     */
    getTitleColumns(className: string) {
        return Observable.create(obs => {
            this.backendService.getResources('crud-class-meta-data')
                .subscribe(data => {
                    // find the crudClassMetaData by class name
                    let crudClassMetaData = _.find(data['_embedded']['crud-class-meta-data'], (o) => {
                        return o['className'] === className;
                    });

                    if (crudClassMetaData.hasOwnProperty('titleColumns')) {
                        obs.next(crudClassMetaData['titleColumns']);
                    } else {
                        obs.next('id');
                    }

                    obs.complete();

                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Gets all columns which have the type='Link' or type='Linkset'
     * @param columnDefs
     * @returns {ColumnDef[]}
     */
    getLinksColumns(columnDefs: ColumnDef[]) {
        let _res: ColumnDef[] = [];

        columnDefs.forEach(i => {
            if (i.type === 'Link' || i.type === 'Linkset') {
                _res.push(i);
            }
        });

        return _res;
    }

}
