import { Injectable } from "@angular/core";
import { ODatabaseService } from "../orientdb/orientdb.service";
import { ServiceNotifications } from "./serviceNotification";

const squel = require('squel');

@Injectable()
export class GridService {

    constructor(public database: ODatabaseService,
                public serviceNotifications: ServiceNotifications) {
    }

    selectLinksetProperties(columnDefs, rowData) {
        let linksetProperties = [];

        columnDefs.filter((obj) => {
            if (obj.type === 'LINKSET') {
                linksetProperties.push({
                    name: obj.property,
                    linkedClass: obj.linkedClass
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

                if (linkset) {
                    for (let keyLink = 0; keyLink < linkset.length; keyLink++) {
                        promises.push(this.getLinksetName(linkset, keyLink, i['linkedClass']));
                    }
                }
            });
        });

        return Promise.all(promises);
    }

    getLinksetName(linkset, keyLink, className) {
        return this.database.load(linkset[keyLink])
            .then((res) => {

                return this.getTitleColumns(className)
                    .then(colunmName => {
                        let record = res.json();

                        linkset['_' + keyLink] = linkset[keyLink];

                        if (colunmName) {
                            linkset[keyLink] = record[colunmName];
                        }
                    });
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
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
