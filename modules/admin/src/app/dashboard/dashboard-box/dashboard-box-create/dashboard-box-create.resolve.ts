import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {DashboardBoxType} from "../../dashboard-box-type/dashboard-box-type.model";
import {DashboardBoxTypeService, REPOSITORY_NAME} from "../../dashboard-box-type/dashboard-box-type.service";

@Injectable()
export class DashboardBoxCreateResolve implements Resolve<DashboardBoxType[]> {

    constructor(public dashboardBoxTypeService: DashboardBoxTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dashboardBoxTypeService.getResources()
            .map(res => res['_embedded'][REPOSITORY_NAME]);
    }
}
