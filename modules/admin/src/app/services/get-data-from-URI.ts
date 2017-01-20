import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ColumnDef } from "../crud/model/column-definition";
import { BackendService } from "./backend/backend.service";
import * as _ from "lodash";
const clone = require("js.clone");

@Injectable()
export class GetDataFromURIService {

    constructor(public backendService: BackendService) {
    }

    parseLinkProps(columnDefs: ColumnDef[], rowData: any[]) {
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
                        this.generateArrayReferencedLink(link, linkedRepository, linkedClass)
                            .subscribe(_columns => {
                                i[objectKey] = _columns;

                                obs.next(true);
                                obs.complete();
                            }, err => {
                                console.error(err);
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

    generateArrayReferencedLink(link: string, linkedRepository: string, linkedClass: string) {
        return Observable.create(obs => {
            this.backendService.getDataByLink(link)
                .subscribe(data => {
                    let _result: any[] = [];

                    if (data && data.hasOwnProperty(linkedRepository)) {
                        data[linkedRepository].forEach(i => {
                            _result.push(i['_links']['self'].href);
                        });
                    }

                    obs.next(_result);
                    obs.complete();
                }, err => {
                    console.error(err);
                    obs.next([]);
                    obs.complete();
                });
        });
    }

}
