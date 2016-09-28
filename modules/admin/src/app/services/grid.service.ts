import { Injectable } from '@angular/core';
import { ODatabaseService } from '../orientdb/orientdb.service';
import { NotificationService } from './notificationService';
import { CrudLevel } from '../crud/model/crudLevel';
import {
    MetaDataPropertyBindingParameterModel
} from '../crudMetadata/metaDataBindingParameter/metaDataBindingParameter.model';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

const squel = require('squel');

@Injectable()
export class GridService {

    constructor(public database: ODatabaseService,
                public serviceNotifications: NotificationService) {
    }

    selectLinksetProperties(columnDefs, rowData) {
        let linksetProperties = [];

        columnDefs.filter((obj) => {
            if (obj.type === 'LINKSET' ||
                obj.type === 'LINK') {
                linksetProperties.push({
                    name: obj.property,
                    linkedClass: obj.linkedClass,
                    type: obj.type
                });
            }
        });

        return this.replaceLinksetItemsWithName(linksetProperties, rowData);
    }

    replaceLinksetItemsWithName(linksetProperties, rowData) {
        let promises = [];

        linksetProperties.forEach((i) => {
            rowData.forEach((row) => {
                let linkset = row[i['name']];

                if (typeof linkset !== 'undefined' && i['type'] === 'LINKSET') {
                    for (let keyLink = 0; keyLink < linkset.length; keyLink++) {
                        promises.push(
                            this.getLinksetName(linkset, keyLink, i['linkedClass'], i['type']));
                    }
                    linkset['type'] = i['type'];
                } else if (i['type'] === 'LINK') {
                    if (typeof row[i['name']] !== 'undefined' && row[i['name']] !== null) {
                        promises.push(
                            this.getLinksetName(row, i['name'], i['linkedClass'], i['type']));
                    }
                }
            });
        });

        return Promise.all(promises);
    }

    getLinksetName(linkset, keyLink, className, type) {
        return this.database.load(linkset[keyLink])
            .then((res) => {
                return this.getTitleColumns(className)
                    .then(columnName => {
                        let record = res.json();

                        switch (type) {
                            case 'LINKSET':
                                linkset['_' + keyLink] = linkset[keyLink];

                                if (record.hasOwnProperty(columnName)
                                    && typeof columnName !== 'undefined') {
                                    linkset[keyLink] = record[columnName];
                                }
                                break;
                            case 'LINK':
                                if (record.hasOwnProperty(columnName)
                                    && typeof columnName !== 'undefined') {
                                    let rid = linkset[keyLink];

                                    linkset[keyLink] = [];
                                    linkset[keyLink][0] = record[columnName];
                                    linkset[keyLink]['rid'] = rid;
                                    linkset[keyLink]['type'] = type;
                                }
                                break;

                            default:
                                break;
                        }
                    });
            }, (error) => {
                this.serviceNotifications.createNotification('error',
                    'ERROR', 'orientdb.dataNotFound');
                return Promise.reject(error);
            });
    }

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
                    ;

                    resolve(result);
                }, err => {
                    reject(err);
                });
        });
    }

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
                                let fromComponent: string =
                                    result.fromProperty + ' ' + result.operator[0] + ' ?';

                                switch (result.combineOperator[0]) {
                                    case 'AND':
                                        expression
                                            .and(fromComponent, result.toProperty);
                                        break;
                                    case 'OR':
                                        expression
                                            .or(fromComponent, result.toProperty);
                                        break;
                                    case 'NOT':
                                        expression
                                            .not(fromComponent, result.toProperty);
                                        break;
                                    default:
                                        break;
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

    getSizeClass(className: string): Observable<number> {
        return Observable.create((obs) => {
            this.database.getInfoClass(className)
                .then((res: Response) => {
                    obs.next(res.json().records);
                    obs.complete();
                }, (error) => {
                    this.serviceNotifications.createNotificationOnResponse(error);
                    obs.error(error);
                    obs.complete();
                });
        });
    }
}
