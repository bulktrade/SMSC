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
            storeObservables = [];

        _rowData.forEach(i => {
            // select all of links properties
            let links = i['_links'];

            Object.keys(links).map((objectKey, index) => {
                let link = links[objectKey].href;
                let linkedRepository: string = this.getLinkedProperty(columnDefs, objectKey, 'linkedRepository'),
                    linkedClass: string = this.getLinkedProperty(columnDefs, objectKey, 'linkedClass');

                if (link && linkedRepository && linkedClass) {

                    let observable = Observable.create((obs) => {
                        // pull resources from the each link
                        this.generateArrayReferencedLink(link, linkedRepository, linkedClass, columnsType)
                            .subscribe(_columns => {
                                i[objectKey] = _columns;

                                obs.next(true);
                                obs.complete();
                            }, err => {
                                obs.next(true);
                                obs.complete();
                            })
                    });

                    storeObservables.push(observable);
                }
            });
        });

        return Observable.create(obs => {
            Observable.forkJoin(storeObservables)
                .subscribe(() => {
                    obs.next(_rowData);
                    obs.complete();
                });
        });
    }

    getLinkedProperty(columnDefs: ColumnDef[], objectKey: string, propertyName: string) {
        let currentColumn = _.find(columnDefs, (o) => {
            return o.property === objectKey;
        });

        let linkedProperty: string = '';

        if (currentColumn && currentColumn.hasOwnProperty(propertyName)) {
            linkedProperty = currentColumn[propertyName];
        }

        return linkedProperty;
    }

    generateArrayReferencedLink(link: string, linkedRepository: string, linkedClass: string, columnsType: ColumnsType) {
        return Observable.create(obs => {

            this.backendService.getResources('crud-class-meta-data')
                .subscribe(data => {
                    // find the crudClassMetaData by class name
                    let crudClassMetaData = _.find(data['_embedded']['crud-class-meta-data'], (o) => {
                        return o['className'] === linkedClass;
                    });

                    let titleColumns: string = 'id';

                    if (crudClassMetaData.hasOwnProperty('titleColumns') && crudClassMetaData['titleColumns']) {
                        titleColumns = crudClassMetaData['titleColumns'];
                    }

                    this.backendService.getDataByLink(link)
                        .subscribe(data => {
                            let _result: any[] = [];

                            if (data && data.hasOwnProperty(linkedRepository)) {
                                data[linkedRepository].forEach(i => {

                                    if (columnsType === ColumnsType.Grid) {
                                        _result.push(i[titleColumns] || i['id']);
                                    } else if (columnsType === ColumnsType.Form) {
                                        _result.push({
                                            title: i[titleColumns] || i['id'],
                                            link: i['_links'].self.href
                                        });
                                    }
                                });
                            }

                            obs.next(_result);
                            obs.complete();
                        }, err => {
                            obs.next([]);
                            obs.complete();
                        });

                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

}
