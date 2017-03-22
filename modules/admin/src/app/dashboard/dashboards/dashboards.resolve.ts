import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../dashboard.model";
import {Observable} from "rxjs";
import {DashboardBoxTypeService} from "../dashboard-box-type/dashboard-box-type.service";
import {DashboardBoxType} from "../dashboard-box-type/dashboard-box-type.model";

@Injectable()
export class DashboardsResolve implements Resolve<{dashboards: Dashboard[], dashboardBoxTypes: DashboardBoxType[]}> {

    constructor(public dashboardService: DashboardService,
                public dashboardBoxTypeService: DashboardBoxTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create(o => {
            this.dashboardService.getDashboards()
                .subscribe((dashboards: Dashboard[]) => {
                    this.dashboardBoxTypeService.getResources()
                        .map(data => data['_embedded'][this.dashboardBoxTypeService.repositoryName])
                        .subscribe((dashboardBoxTypes: DashboardBoxType[]) => {
                            if (!dashboards.length) {
                                this.dashboardService.createDefaultDashboard()
                                    .subscribe((dashboard: Dashboard) => {
                                        o.next({dashboards: [dashboard], dashboardBoxTypes: dashboardBoxTypes});
                                        o.complete();
                                    }, e => {
                                        o.error(e);
                                        o.complete();
                                    });
                            } else {
                                o.next({dashboards: dashboards, dashboardBoxTypes: dashboardBoxTypes});
                                o.complete();
                            }
                        }, e => {
                            o.error(e);
                            o.complete();
                        });
                }, e => {
                    o.error(e);
                    o.complete();
                });
        });
    }
}
