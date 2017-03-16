import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "./dashboard.service";
import {DashboardBox} from "./dashboard-box/dashboard-box.model";
import {DashboardBoxService} from "./dashboard-box/dashboard-box.service";
import {Dashboard} from "./dashboard.model";
import {Observable} from "rxjs";

@Injectable()
export class DashboardResolve implements Resolve<DashboardBox[]> {

    constructor(public dashboardService: DashboardService,
                public dashboardBoxService: DashboardBoxService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create(o => {
            this.dashboardService.getResourceById(Number(route.params['id']))
                .subscribe((dashboard: Dashboard) => {
                    this.dashboardBoxService.getDashboardBoxes(dashboard)
                        .subscribe((dashboardBoxes: DashboardBox[]) => {
                            o.next(dashboardBoxes);
                            o.complete();
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
