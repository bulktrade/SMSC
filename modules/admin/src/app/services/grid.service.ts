import { Injectable } from "@angular/core";
import { ODatabaseService } from "../orientdb/orientdb.service";
import { ServiceNotifications } from "./serviceNotification";

@Injectable()
export class GridService {

    constructor(public database: ODatabaseService,
                public serviceNotifications: ServiceNotifications,) {
    }

    selectLinksetProperties(columnDefs, rowData) {
        let linksetProperties = [];

        columnDefs.filter((obj) => {
            if (obj.type === 'LINKSET') {
                linksetProperties.push(obj.property);
            }
        });

        return this.replaceLinksetItemsWithName(linksetProperties, rowData);
    }

    replaceLinksetItemsWithName(linksetProperties, rowData) {
        let promises = [];

        linksetProperties.forEach((i) => {
            rowData.forEach((row) => {
                let linkset = row[i];

                if (linkset) {
                    for (let keyLink = 0; keyLink < linkset.length; keyLink++) {
                        promises.push(this.getLinksetName(linkset, keyLink));
                    }
                }
            });
        });

        return Promise.all(promises);
    }

    getLinksetName(linkset, keyLink) {
        return this.database.load(linkset[keyLink])
            .then((res) => {
                let record = res.json();

                linkset['_' + keyLink] = linkset[keyLink];
                linkset[keyLink] = record.name;
            }, (error) => {
                this.serviceNotifications.createNotificationOnResponse(error);
                return Promise.reject(error);
            })
    }
}
