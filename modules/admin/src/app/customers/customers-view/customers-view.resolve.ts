import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NotificationService } from "../../services/notification-service";
import { BackendService } from "../../services/backend/backend.service";
import { GetDataFromURIService } from "../../services/get-data-from-URI";
import { CustomersService } from "../customers.service";
import { Pagination } from "../model/pagination";
import { GridOptions } from "../model/grid-options";

@Injectable()
export class CustomersViewResolve implements Resolve<any> {

    constructor(public customersService: CustomersService,
                public notification: NotificationService,
                public backendService: BackendService,
                public URIService: GetDataFromURIService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let pagination: Pagination = new Pagination(10, null, null, 0);
        let gridOptions: GridOptions = <GridOptions>{};

        return Observable.create((observer) => {
            this.customersService.getColumnDefs('crud-meta-grid-data')
                .subscribe((columns) => {
                    gridOptions.columnDefs = columns;

                    this.customersService.getCustomers(pagination.number, pagination.size)
                        .subscribe(resources => {
                            gridOptions.rowData = resources;

                            // get total rows
                            this.customersService.getNumberCustomers()
                                .subscribe(countRows => {
                                    gridOptions.totalElements = countRows.page.totalElements;

                                    observer.next(gridOptions);
                                    observer.complete();
                                });
                        }, err => {
                            this.notification.createNotificationOnResponse(err);
                            observer.error(err);
                            observer.complete();
                        });
                }, err => {
                    this.notification.createNotificationOnResponse(err);
                    observer.error(err);
                    observer.complete();
                });
        });
    }

}
