import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable, Observer} from "rxjs";
import {DashboardList} from "./models/dashboardList";
import {DashboardBox} from "./models/dashboardBox";
import {DashboardListItem} from "./models/dashboardListItem";
import {OrderBy} from "./sorts/orderby";
import {DashboardService} from "./dashboardService";

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

                let ressult = {
                    boxesCss: boxesCss,
                    boxes: boxes
                }

                observer.next(ressult);
                observer.complete();
            });
        });
    }
}
