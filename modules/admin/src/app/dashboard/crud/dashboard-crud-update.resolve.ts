import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { DashboardService } from '../dashboard.service';

@Injectable()
export class DashboardCrudUpdateResolve implements Resolve<any> {
    constructor(public location: Location,
                public dashboardService: DashboardService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        let className = route.parent.data['crudClass'];

        return this.dashboardService.getBoxFormColumns(route, id, className);
    }
}
