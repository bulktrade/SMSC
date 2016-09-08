import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { DashboardBox } from "./services/dashboard.box";

const squel = require('squel');

@Injectable()
export class DashboardService {
    constructor(private databaseService:ODatabaseService) {

    }

    /**
     * Get dashboard boxes
     *
     * @returns {any}
     */
    public getDashboardBoxes():Promise<Array<DashboardBox>> {
        let query = squel.select()
            .from('DashboardBox')
            .field('*')
            .field('type.*')
            //.where(`type.name = ?`, type)
            .toString();

        return this.databaseService.query(query).then((res:Response) => {
            let result = res.json().result;

            return Promise.resolve(result);
        }).catch((ex) => {
            throw new Error(ex);
        });
    }

    /**
     * Update box width
     *
     * width - box width(25/50/75/100)
     * rid - @rid
     */
    public updateBoxWidth(width:number, item:any){
        let property: any = {};
        property['@rid'] = item['@rid'];
        property['@version'] = item['@version'];
        property.name = item.name;
        property.size = width;
        property.order = item.order;
        property.description = item.description;
        property.type = item.type;
        property.dashboard = item.dashboard;

        this.databaseService.update(property).catch((ex) => {
            throw new Error(ex);
        });
    }

    /**
     * Delete one box
     * @param rid - box @rid
     */
    public deleteBox(rid:string){
        let property: any = {};
        property['@rid'] = rid;
        this.databaseService.delete(property);
    }

    /**
     * Batch update
     * @param list - list of boxes
     */
    public batchUpdate(list:Array<any>){
        let operations:Array<Object> = new Array();

        for(let key in list){
            delete list[key]['@type'];
            let tmp:Object = {
                type: 'u',//    Operation what we do('u' - update)
                record: list[key]
            };
            operations.push(tmp);
        }

            //  Create object for batchRequest function
        let data:Object = {
            transaction: true,
            operations: operations
        };

        this.databaseService.batchRequest(data);
    }
}
