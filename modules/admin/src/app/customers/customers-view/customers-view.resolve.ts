import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NotificationService } from "../../services/notification-service";
import { URIHandlingService } from "../../services/uri-handling";
import { CustomersService, REPOSITORY_NAME, URI_COLUMNS } from "../customers.service";
import { Pagination } from "../model/pagination";
import { GridOptions } from "../model/grid-options";

@Injectable()
export class CustomersViewResolve implements Resolve<any> {

    constructor(public customersService: CustomersService,
                public notification: NotificationService,
                public URIService: URIHandlingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let pagination: Pagination = new Pagination(10, null, null, 0);
        let gridOptions: GridOptions = <GridOptions>{};

        return Observable.create((observer) => {
            this.customersService.getCustomers(pagination.number, pagination.size)
                .subscribe(resources => {
                    gridOptions.rowData = this.URIService.parseUriProps(URI_COLUMNS,
                        resources['_embedded'][REPOSITORY_NAME]);
                    gridOptions.totalElements = resources['page']['totalElements'];

                    observer.next(gridOptions);
                    observer.complete();
                }, err => {
                    this.notification.createNotificationOnResponse(err);
                    observer.error(err);
                });
        });
    }

}
