import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../dashboard.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DashboardUpdateResolve implements Resolve<Dashboard> {

    constructor(public dashboardService: DashboardService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dashboard> {
        return this.dashboardService.getResourceById(Number(route.params['id']));
    }
}
