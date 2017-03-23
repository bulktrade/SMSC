import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardService} from "../dashboard.service";
import {DashboardBoxType} from "../dashboard-box-type.model";
import {DashboardBoxTypeService} from "../dashboard-box-type.service";

@Injectable()
export class DashboardBoxTypeUpdateResolve implements Resolve<DashboardBoxType> {

    constructor(public dashboardBoxTypeService: DashboardBoxTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dashboardBoxTypeService.getResourceById(Number(route.params['id']));
    }
}
