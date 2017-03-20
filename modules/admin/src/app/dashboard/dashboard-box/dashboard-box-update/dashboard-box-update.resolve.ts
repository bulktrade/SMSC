import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "../dashboard.service";
import {DashboardBox} from "../dashboard-box.model";
import {DashboardBoxService} from "../dashboard-box.service";

@Injectable()
export class DashboardBoxUpdateResolve implements Resolve<DashboardBox> {

    constructor(public dashboardBoxService: DashboardBoxService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dashboardBoxService.getResourceById(Number(route.params['dashboardBoxId']));
    }
}
