import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "./dashboard.service";
import {DashboardBox} from "./dashboard-box/dashboard-box.model";
import {DashboardBoxService} from "./dashboard-box/dashboard-box.service";
import {Dashboard} from "./dashboard.model";
import {Observable} from "rxjs";
import {DashboardBoxTypeService} from "./dashboard-box-type/dashboard-box-type.service";
import {DashboardBoxType} from "./dashboard-box-type/dashboard-box-type.model";

@Injectable()
export class DashboardResolve implements Resolve<DashboardBox[]> {

    constructor(public dashboardService: DashboardService,
                public dashboardBoxService: DashboardBoxService,
                public dashboardBoxTypeService: DashboardBoxTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create(o => {
            // get dashboard
            this.dashboardService.getResourceById(Number(route.params['id']))
                .subscribe((dashboard: Dashboard) => {
                    // get dashboard boxes
                    this.dashboardBoxService.getDashboardBoxes(dashboard)
                        .subscribe((dashboardBoxes: DashboardBox[]) => {
                            // get dashboard box types
                            this.getDashboardBoxTypes(dashboardBoxes)
                                .subscribe(() => {
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
                }, e => {
                    o.error(e);
                    o.complete();
                });
        });
    }

    getDashboardBoxTypes(dashboardBoxes: DashboardBox[]): Observable<DashboardBox[]> {
        let obsBatch: Observable<DashboardBox>[] = [Observable.of(<DashboardBox>{})];

        dashboardBoxes.forEach((dashboardBox: DashboardBox, i: number, dashboardBoxes: DashboardBox[]) => {
            obsBatch.push(Observable.create(o => {
                this.dashboardBoxTypeService.getDashboardBoxType(dashboardBox)
                    .subscribe((dashboardBoxType: DashboardBoxType) => {
                        dashboardBoxes[i].dashboardBoxType = dashboardBoxType;
                        o.next(dashboardBoxType);
                        o.complete();
                    }, e => {
                        o.error(e);
                        o.complete();
                    });
            }));
        });

        return Observable.forkJoin(obsBatch);
    }
}
