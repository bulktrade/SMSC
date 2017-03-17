import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Params} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "./dashboard.service";

@Injectable()
export class DashboardResolve implements Resolve<any> {

    constructor(public dashboardService: DashboardService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dashboardService.getResourceById(Number(route.params['id']));
    }
}
