import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { DashboardBox } from "./models/dashboardBox.ts";

const squel = require('squel');

@Injectable()
export class DashboardService {
    constructor(private databaseService: ODatabaseService) {

    }

    /**
     * Get dashboard boxes
     *
     * @returns {any}
     */
    public getDashboardBoxes(): Promise<Array<DashboardBox>> {
        let query = squel.select()
            .from('DashboardBox')
            .field('*')
            .toString();

        return this.databaseService.query(query, 50, '*:3').then((res: Response) => {
            let result: Array = [];

            for (let item of res.json().result) {
                result.push(new DashboardBox(item));
            }

            return Promise.resolve(result);
        }).catch((ex) => {
            return Promise.reject(ex);
        });
    }

    /**
     * Update box width
     *
     * width - box width(25/50/75/100)
     * height - box height(25/50/75/100)
     * rid - @rid
     */
    public updateBoxSize(size: Object, item: DashboardBox): Promise {
        let send: Object = item.getORecord();
        send['width'] = size['width'];
        send['height'] = size['height'];

        return this.databaseService.update(send).then((res) => {
            let result = JSON.parse(res._body);

            return Promise.resolve(result.result[0]);
        })
            .catch((ex) => {
                return Promise.reject(ex);
            });
    }

    /**
     * Delete one box
     * @param rid - box @rid
     */
    public deleteBox(rid: string) {
        let property: any = {};
        property['@rid'] = rid;
        this.databaseService.delete(property);
    }

    /**
     * Batch update
     *
     * @param list - list of boxes
     */
    // @todo Rename batchUpdate -> batchUpdateDashboardBox
    public batchUpdateDashboardBox(list: Array<DashboardBox>): Promise {
        let operations: Array<Object> = [];

        for (let key in list) {
            let oRecord:Object = list[key].getORecord();

            let tmp: Object = {
                type: 'u',//    Operation what we do('u' - update)
                record: oRecord
            };
            operations.push(tmp);
        }

        //  Create object for batchRequest function
        let data: Object = {
            transaction: true,
            operations: operations
        };

        return this.databaseService.batchRequest(data).then(() => {
            let result = this.getDashboardBoxes();

            return Promise.resolve(result);
        }).catch((ex) => {
            return Promise.reject(ex);
        });
    }
}
