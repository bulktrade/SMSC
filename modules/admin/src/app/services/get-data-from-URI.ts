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
            obsStore = [],
            // get all columns which have the type='Link' or type='Linkset'
            linkColumns: ColumnDef[] = this.getLinksColumns(columnDefs);

        linkColumns.forEach(column => {
            _rowData.forEach(row => {
                // generate for grid
                if (Array.isArray(row[column.property])) {
                    row[column.property].forEach((item, i, arr) => {
                        obsStore.push(
                            Observable.create(obs => {
                                this.getTitleColumns(column.linkedClass)
                                    .subscribe((titleColumns) => {
                                        arr[i] = item[titleColumns] || item['id'];

                                        obs.next(true);
                                        obs.complete();
                                    });
                            })
                        );
                    });
                }
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
            if (i.type === 'URI') {
                _res.push(i);
            }
        });

        return _res;
    }

}
