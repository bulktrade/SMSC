import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { GridService } from '../../services/grid.service';
import { CrudService } from '../../crud/crud.service';
import { CrudResolve } from '../../crud/common/crudResolve';
import { DashboardService } from '../dashboardService';

@Injectable()
export class DashboardCrudUpdateResolve extends CrudResolve {
    constructor(public crudService: CrudService,
                public location: Location,
                public gridService: GridService,
                public dashboardService: DashboardService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        let className = route.parent.data['crudClass'];

        return this.dashboardService.getBoxFormColumns(route, state, id, className);
    }
}
