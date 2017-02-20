import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {NotificationService} from "../../services/notification-service";
import {CustomersService, REPOSITORY_NAME} from "../customer.service";
import {Pagination} from "../model/pagination";
import {GridOptions} from "../model/grid-options";

@Injectable()
export class CustomersViewResolve implements Resolve<any> {

    constructor(public customersService: CustomersService,
                public notification: NotificationService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let pagination: Pagination = new Pagination(10, null, null, 0);
        let gridOptions: GridOptions = <GridOptions>{};

        return Observable.create((observer) => {
            this.customersService.getResources(pagination.number, pagination.size)
                .subscribe(resources => {
                    gridOptions.rowData = resources['_embedded'][REPOSITORY_NAME];
                    gridOptions.totalElements = resources['page']['totalElements'];
                    observer.next(gridOptions);
                    observer.complete();
                }, err => {
                    this.notification.createNotificationOnResponse(err);
                    observer.error(err);
                }, () => {
                    observer.next(true);
                    observer.complete();
                });
        });
    }

}
