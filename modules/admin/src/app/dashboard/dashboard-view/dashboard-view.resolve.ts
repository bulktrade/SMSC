import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { DashboardList } from '../models/dashboard-list';
import { DashboardBox } from '../models/dashboard-box';
import { DashboardListItem } from '../models/dashboard-list-item';
import { OrderBy } from '../pipe/orderby';
import { DashboardService } from '../dashboard.service';

@Injectable()
export class DashboardViewResolve implements Resolve<any> {
    constructor(private dashboardService: DashboardService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Object> {
        return Observable.create((observer: Observer<Object>) => {
            this.dashboardService.getDashboardBoxes().subscribe((res) => {
                let boxesCss = new DashboardList<string>();
                let boxes = new DashboardListItem<DashboardBox>();
                let orderBy: OrderBy = new OrderBy();
                boxes.merge(orderBy.transform(res, { key: 'order', direction: 'ascending' }));

                let result = {
                    boxesCss: boxesCss,
                    boxes: boxes
                };

                observer.next(result);
                observer.complete();
            });
        });
    }
}
