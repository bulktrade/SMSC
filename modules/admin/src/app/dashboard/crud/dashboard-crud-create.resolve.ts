import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { GridService } from '../../services/grid.service';
import { CrudService } from '../../crud/crud.service';
import { CrudResolve } from '../../crud/common/crud-resolve';
import { DashboardService } from '../dashboard.service';
import { ColumnModel } from '../../crud/model/crud-column';
import { Observer, Observable } from 'rxjs';

@Injectable()
export class DashboardCrudCreateResolve extends CrudResolve {
    constructor(public crudService: CrudService,
                public location: Location,
                public gridService: GridService,
                public dashboardService: DashboardService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let className = route.params['className'];

        this.crudService.setParentPath(route.parent.pathFromRoot);

        return Observable.create((observer: Observer<ColumnModel>) => {
            this.crudService.getFormColumnDefs(className).subscribe((res) => {
                this.crudService.model['dashboard'] = route.params['dashboard'];

                observer.next(res);
                observer.complete();
            });
        });
    }
}
