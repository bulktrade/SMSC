import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../dashboard.model";
import {Observable} from "rxjs";

@Injectable()
export class DashboardsResolve implements Resolve<Dashboard[]> {

    constructor(public dashboardService: DashboardService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create(o => {
            this.dashboardService.getDashboards()
                .subscribe((dashboards: Dashboard[]) => {
                    if (!dashboards.length) {
                        this.dashboardService.createDefaultDashboard()
                            .subscribe((dashboard: Dashboard) => {
                                o.next([dashboard]);
                                o.complete();
                            }, e => {
                                o.error(e);
                                o.complete();
                            });
                    } else {
                        o.next(dashboards);
                        o.complete();
                    }
                }, e => {
                    o.error(e);
                    o.complete();
                });
        });
    }
}
