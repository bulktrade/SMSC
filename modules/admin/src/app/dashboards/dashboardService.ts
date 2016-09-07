import { ODatabaseService } from "../orientdb/orientdb.service";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { DashboardBox } from "./services/dashboard.box";
import { RequestGetParameters } from "../orientdb/orientdb.requestGetParameters";

const squel = require('squel');

@Injectable()
export class DashboardService {
    constructor(private databaseService:ODatabaseService) {

    }

        //  Get dashboard boxes
    public getDashboardBoxes(type:string):Promise<Array<DashboardBox>> {
        let query = squel.select()
            .from('DashboardBox')
            .field('*')
            .field('type.*')
            .where(`type.name = ?`, type)
            .toString();

        return this.databaseService.query(query).then((res:Response) => {
            let result = res.json().result;
            //console.log(result);)
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
        console.log(item);
        let property: any = {};
        property['@rid'] = item['@rid'];
        property['@version'] = item['@version'];
        //property['@class'] = '@DashboardBox';
        property.name = item.name;
        property.size = width;
        property.order = item.order;
        property.description = item.description;
        property.type = item.type;
        property.dashboard = item.dashboard;
        this.databaseService.update(property).then((res) => {
            console.log(res);
        });
    }

    public deleteBox(rid:string){
        let property: any = {};
        property['@rid'] = rid;
        //this.databaseService.delete(property);
    }
}
