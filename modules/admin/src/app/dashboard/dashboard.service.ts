import { Injectable } from "@angular/core";
import { DashboardBox } from "./models/dashboard-box";
// import { GridService } from "../services/grid.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Dashboard } from "./models/dashboard";
import { AuthHttp } from "angular2-jwt";
import { ConfigService } from "../config/config.service";

const squel = require('squel');

@Injectable()
export class DashboardService {
    constructor(public location: Location,
                // public gridService: GridService,
                private authHttp: AuthHttp,
                private configService: ConfigService) {

    }

    /**
     * Get dashboard boxes
     *
     * @returns {any}
     */
    public getDashboardBoxes(): Observable<Array<DashboardBox>> {
        let query = squel.select()
            .from('DashboardBox')
            .field('*')
            .toString();

        return Observable.create((observer: Observer<Array<DashboardBox>>) => {
            // this.databaseService.query(query, 50, '*:3').subscribe((res: Response) => {
            //     let result: Array<DashboardBox> = [];
            //
            //     for (let item of res.json().result) {
            //         item.width = Number(item.width[0]);
            //         item.height = Number(item.height[0]);
            //         result.push(new DashboardBox(item));
            //     }
            //
            //     observer.next(result);
            //     observer.complete();
            // }, (ex) => {
            //     observer.error(ex);
            //     observer.complete();
            // });
        });
    }

    /**
     * Get single dashboard box
     *
     * @param rid - dashboard rid
     * @returns {Promise<DashboardBox>|Promise<TResult|DashboardBox>|Promise<U>}
     */
    public getDashboardBox(rid: string): Observable<DashboardBox> {
        let query = squel.select()
            .from('DashboardBox')
            .field('*')
            .where('@rid = ?', rid)
            .toString();

        return Observable.create((observer: Observer<DashboardBox>) => {
            // this.databaseService.query(query, 1, '*:3').subscribe((res: Response) => {
            //     let result: DashboardBox = new DashboardBox(res.json().result[0]);
            //
            //     observer.next(result);
            //     observer.complete();
            // }, (ex) => {
            //     observer.error(ex);
            //     observer.complete();
            // });
        });
    }

    /**
     * Update box width
     *
     * width - box width(25/50/75/100)
     * height - box height(25/50/75/100)
     * rid - @rid
     */
    public updateBoxSize(size: Object, item: DashboardBox) {
        // let send: Object = item.getORecord();
        // send['width'] = size['width'];
        // send['height'] = size['height'];
        // let obj: any = {
        //     type: BatchType.UPDATE,
        //     record: send
        // };
        // let options: Array<Operation> = [obj];
        //
        // return Observable.create((observer: Observer<Object>) => {
        //     // this.databaseService.batch(options).subscribe((res) => {
        //     //     let result = JSON.parse(res['_body']);
        //     //
        //     //     observer.next(result.result[0]);
        //     //     observer.complete();
        //     // });
        // });
    }

    /**
     * Delete one box
     * @param rid - box @rid
     */
    public deleteBox(box: DashboardBox) {
        // let obj: any = {
        //     type: BatchType.DELETE,
        //     record: box.getORecord()
        // };
        // let options: Array<Operation> = [obj];

        // return this.databaseService.batch(options);
    }

    /**
     * Batch update
     *
     * @param list - list of boxes
     */
    public batchUpdateDashboardBox(list: Array<DashboardBox>): Observable<Array<DashboardBox>> {
        // let operations: Array<Operation> = [];
        //
        // for (let key in list) {
        //     if (list.hasOwnProperty(key)) {
        //         let oRecord: Object = list[key].getORecord();
        //
        //         let tmp: any = {
        //             type: BatchType.UPDATE,
        //             record: oRecord
        //         };
        //
        //         operations.push(tmp);
        //     }
        // }

        return Observable.create((observer: Observer<Array<DashboardBox>>) => {
            // this.databaseService.batch(operations).subscribe(() => {
            //     this.getDashboardBoxes().subscribe((res) => {
            //         observer.next(res);
            //         observer.complete();
            //     }, (ex) => {
            //         observer.error(ex);
            //         observer.complete();
            //     });
            // });
        });
    }

    /**
     * Get dashboard box class columns
     *
     * @param route
     * @param id
     * @param className
     * @returns {Subscription}
     */
    public getBoxFormColumns(route: ActivatedRouteSnapshot,
                             id: string, className: string) {
        // this.crudService.setClassName(className);
        //
        // return Observable.create((observer: Observer<EditModel>) => {
            // this.crudService.databaseService.load(id)
            //     .then((res: Response) => {
            //         let result = JSON.parse(res['_body']);
            //         let model = [];
            //         this.crudService.model = this.crudService.model || {};
            //
            //         if (!Object.keys(this.crudService.model).length) {
            //             model.push(result);
            //         }
            //
            //         this.crudService.getFormColumnDefs(className)
            //             .subscribe((columnDefs) => {
            //                 return this.gridService.selectLinksetProperties(columnDefs, model)
            //                     .then(() => {
            //                         let editModel: EditModel = {
            //                             columnDefs: columnDefs,
            //                             inputModel: model[0]
            //                         };
            //
            //                         observer.next(editModel);
            //                         observer.complete();
            //                     });
            //             }, (error) => {
            //                 this.crudService.serviceNotifications.createNotificationOnResponse(
            //                     error);
            //                 observer.error(error);
            //                 observer.complete();
            //             });
            //     }, error => {
            //         this.crudService.serviceNotifications.createNotificationOnResponse(error);
            //         this.location.back();
            //         observer.error(error);
            //         observer.complete();
            //     });
        // });
    }

    // Temporary
    /**
     * Get Dashboard for DashboardBox for navigate to form without "Dashboard" field
     */
    public getDashboard(): Observable<DashboardBox> {
        let query = squel.select()
            .from('Dashboard')
            .field('*')
            .limit(1)
            .toString();

        return Observable.create((observer: Observer<Dashboard>) => {
            // this.databaseService.query(query, 50, '*:3').subscribe((res: Response) => {
            //     let data = res.json().result[0];
            //     let dashboard: Dashboard = new Dashboard(
            //         new MetaData(
            //             data['@class'],
            //             data['@rid'],
            //             data['@version']
            //         ),
            //         data['icon'],
            //         data['name'],
            //         new OUser(
            //             data['user']['name']
            //         )
            //     );
            //
            //     observer.next(dashboard);
            //     observer.complete();
            // });
        });
    }
}
