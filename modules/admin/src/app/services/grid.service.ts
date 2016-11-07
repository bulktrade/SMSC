import { Injectable } from '@angular/core';
import { ODatabaseService } from '../orientdb/orientdb.service';
import { NotificationService } from './notification-service';
import { CrudLevel } from '../crud/model/crud-level';
import {
    MetaDataPropertyBindingParameterModel
} from '../crud-meta-data/binding-parameter/binding-parameter.model';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BatchType } from '../orientdb/model/batch-type';
import { Operation } from '../orientdb/model/operation';
import { LinksetProperty } from './model/linkset-property';

const squel = require('squel');

@Injectable()
export class GridService {

    constructor(public database: ODatabaseService,
                public serviceNotifications: NotificationService) {
    }

    /**
     * Selects all linkset properties and replaces RID with title columns.
     *
     * @example
     * let rowData = {
     *  "name" : "Luca"
     *  "users": [
     *      "#25:0",
     *      "#25:1"
     *  ]
     * };
     *
     * let columnDefs = [
     *  { headerName: "Name", field: "name" },
     *  { headerName: "Users", field: "users" }
     * ];
     *
     * selectLinksetProperties(columnDefs, rowData).then(() => {
     *  // rowData will be
     *  //
     *  // rowData = {
     *  // "name" : "Luca"
     *  // "users": [
     *  //     "0": "admin",
     *  //     "1": "reader",
     *  //     "_0" "#25:0",
     *  //     "_1" "#25:1",
     *  //     "type": "LINKSET"
     *  //   ]
     *  // };
     * });
     *
     * @param columnDefs
     * @param rowData
     * @returns {any}
     */
    selectLinksetProperties(columnDefs, rowData) {
        let linksetProperties: Array<LinksetProperty> = [];

        columnDefs.filter((obj) => {
            if (obj.type === 'LINKSET' ||
                obj.type === 'LINK') {
                let linksetProperty: LinksetProperty = {
                    name: obj.property,
                    linkedClass: obj.linkedClass,
                    type: obj.type
                };

                linksetProperties.push(linksetProperty);
            }
        });

        return this.replaceLinksetItemsWithName(linksetProperties, rowData);
    }

    /**
     * Replaces all link in grid with titleColumns.
     *
     * @param linksetProperties
     * @param rowData
     * @returns {any}
     */
    replaceLinksetItemsWithName(linksetProperties: Array<LinksetProperty>, rowData) {
        let promises = [];

        linksetProperties.forEach((i) => {
            let expr: string = squel.select()
                .from(i.linkedClass);

            this.getTitleColumns(i.linkedClass)
                .then((titleColumns: string) => {
                    this.database.query(expr.toString())
                        .subscribe((res: Response) => {
                            let records = res.json().result;

                            rowData.forEach((row) => {
                                let linkset = row[i['name']];

                                if (typeof linkset !== 'undefined' && i['type'] === 'LINKSET') {
                                    for (let keyLink = 0; keyLink < linkset.length; keyLink++) {
                                        promises.push(
                                            this.setNameToLinksetProperty(linkset, keyLink,
                                                titleColumns, i['type'], records));
                                    }
                                    linkset['type'] = i['type'];
                                } else if (i['type'] === 'LINK') {
                                    if (typeof row[i['name']] !== 'undefined' &&
                                        row[i['name']] !== null) {
                                        promises.push(
                                            this.setNameToLinksetProperty(row, i['name'],
                                                titleColumns, i['type'], records));
                                    }
                                }
                            });
                        });
                });
        });

        return Promise.all(promises);
    }

    /**
     * Sets name to linkset property.
     *
     * @param linkset
     * @param keyLink
     * @param className
     * @param type
     * @returns {Promise<TResult>|Promise<TResult2|TResult1>|Promise<U>}
     */
    setNameToLinksetProperty(linkset, keyLink, titleColumns, type, records) {
        records.filter((record) => {
            if (record['@rid'] === linkset[keyLink]) {

                switch (type) {
                    case 'LINKSET':
                        linkset['_' + keyLink] = linkset[keyLink];

                        if (record.hasOwnProperty(titleColumns)
                            && typeof titleColumns !== 'undefined') {
                            linkset[keyLink] = record[titleColumns];
                        }
                        break;
                    case 'LINK':
                        if (record.hasOwnProperty(titleColumns)
                            && typeof titleColumns !== 'undefined') {
                            let rid = linkset[keyLink];

                            linkset[keyLink] = [];
                            linkset[keyLink][0] = record[titleColumns];
                            linkset[keyLink]['rid'] = rid;
                            linkset[keyLink]['type'] = type;
                        }
                        break;

                    default:
                        break;
                }

            }
        });
    }

    /**
     * Gets the name for column from the titleColumns property.
     *
     * @param className
     * @return {Promise<T>}
     */
    getTitleColumns(className): Promise<string> {
        let queryCrudClassMetaData = squel.select()
            .from('CrudClassMetaData')
            .where('class = ?', className);

        return new Promise((resolve, reject) => {
            this.database.query(
                queryCrudClassMetaData.toString())
                .subscribe((res) => {
                    let result = null;

                    if (res.json().result.length) {
                        result = res.json().result[0].titleColumns;
                    }

                    resolve(result);
                }, err => {
                    reject(err);
                });
        });
    }

    /**
     * Generates the expression for filtering the links.
     *
     * @example
     * let currentCrudLevel: CrudLevel = ...;
     *
     * combineOperators(currentCrudLevel).then((res) => {
     *  console.log(res.toString()); // `@rid` = `#25:0` OR `@rid` = `#25:1`
     * });
     *
     * @param currentCrudLevel
     * @returns {any}
     */
    combineOperators(currentCrudLevel: CrudLevel) {
        if (typeof currentCrudLevel !== 'undefined') {
            let promises: Array<Promise<string>> = [];
            let expression = squel.expr();

            for (let i in currentCrudLevel.linksetProperty.bingingProperties) {
                if (currentCrudLevel.linksetProperty.bingingProperties.hasOwnProperty(i)) {
                    let rid = currentCrudLevel.linksetProperty.bingingProperties[i];

                    promises.push(
                        this.database.load(rid)
                            .then(res => {
                                let result: MetaDataPropertyBindingParameterModel = res.json();

                                if (currentCrudLevel.inputModel.hasOwnProperty('@rid')) {
                                    let expr: string = result.fromProperty + '.' +
                                        result.toProperty + ' ' + result.operator + ' ' +
                                        currentCrudLevel.linksetProperty.data[result.toProperty];

                                    if (currentCrudLevel.linksetProperty.data[result.toProperty]) {
                                        expression
                                            .or(expr);
                                    }
                                } else {
                                    let expr: string = result.fromProperty + '.' +
                                        result.toProperty + ' ' + 'IS NULL';

                                    expression
                                        .or(expr);
                                }
                            })
                    );
                }
            }

            return Promise.all(promises)
                .then(() => {
                    return Promise.resolve(expression);
                });
        } else {
            return Promise.resolve(null);
        }
    }

    /**
     * Returns the number records from class.
     *
     * @param className
     * @returns {any}
     */
    getSizeClass(className: string): Observable<number> {
        return Observable.create((obs) => {
            this.database.getInfoClass(className)
                .subscribe((res: Response) => {
                    obs.next(res.json().records);
                    obs.complete();
                }, (error) => {
                    this.serviceNotifications.createNotificationOnResponse(error);
                    obs.error(error);
                    obs.complete();
                });
        });
    }

    /**
     * Adds link to created record to LINK properties.
     * After created a new customer,
     * the contact should have a link to the customer after creating
     *
     * @example
     * addLinkToCreatedRecord('#22:3', 'customer', ['users', 'contacts']);
     *
     * @param result
     * @param className
     * @param nameProperty
     * @param linkProperties
     * @returns {Promise<Response>}
     */
    addLinkToCreatedRecord(result, nameProperty: string,
                           linkProperties: Array<string>): Promise<Response> {
        let promises: Array<Promise<Response>> = [];

        linkProperties.forEach(i => {
            let link = result[i];

            for (let k in link) {
                if (link.hasOwnProperty(k)) {
                    let rid = link[k];

                    promises.push(
                        this.database.load(rid)
                            .then((res: Response) => {
                                let dataRow = res.json();
                                dataRow[nameProperty] = result['@rid'];

                                let operations: Array<Operation> = [
                                    {
                                        type: BatchType.UPDATE,
                                        record: dataRow
                                    }
                                ];

                                return new Promise((resolve, reject) => {
                                    this.database.batch(operations)
                                        .subscribe(response => {
                                            resolve(response);
                                        }, err => {
                                            reject(err);
                                        });
                                });
                            })
                    );
                }
            }
        });

        return Promise.all(promises);
    }
}
