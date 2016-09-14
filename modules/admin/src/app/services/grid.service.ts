import { Injectable } from "@angular/core";
import { ODatabaseService } from "../orientdb/orientdb.service";
import { NotificationService } from "./notificationService";

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
                        promises.push(this.getLinksetName(linkset, keyLink, i['linkedClass'], i['type']));
                    }
                    linkset['type'] = i['type'];
                } else if (i['type'] === 'LINK') {
                    if (typeof row[i['name']] !== 'undefined') {
                        promises.push(this.getLinksetName(row, i['name'], i['linkedClass'], i['type']));
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
                                let rid = linkset[keyLink];

                                linkset[keyLink] = [];
                                linkset[keyLink][0] = record[columnName];
                                linkset[keyLink]['rid'] = rid;
                                linkset[keyLink]['type'] = type;
                                break;
                        }
                    });
            }, (error) => {
                this.serviceNotifications.createNotification('error', 'ERROR', 'orientdb.dataNotFound');
                return Promise.reject(error);
            })
    }

    getTitleColumns(className) {
        let queryCrudClassMetaData = squel.select()
            .from('CrudClassMetaData')
            .where('class = ?', className);

        return this.database.query(
            queryCrudClassMetaData.toString())
            .then((res) => {
                let result = null;

                if (res.json().result.length) {
                    result = res.json().result[0].titleColumns;
                }
                return Promise.resolve(result);
            })
            .catch((error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            });
    }
}
