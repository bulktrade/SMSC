import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crud-resolve";
import { CrudService } from "../crud.service";
import { Pagination } from "../model/pagination";
import { Observable } from "rxjs";
import { GridOptions } from "../model/grid-options";
import { LoadingGridService } from "../../services/loading/loading-grid.service";
import { BackendService } from "../../services/backend/backend.service";
import { NotificationService } from "../../services/notification-service";

@Injectable()
export class CrudLinksetResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public loadingGridService: LoadingGridService,
                public notification: NotificationService,
                public backendService: BackendService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let className = route.params['className'];
        let repositoryName = route.params['repositoryName'];
        let pagination: Pagination = new Pagination(10, null, null, 0);

        let gridOptions: GridOptions = <GridOptions>{};
        this.loadingGridService.start();

        return Observable.create((observer) => {
            this.crudService.getGridColumnDefs(className)
                .subscribe((columns) => {
                    this.loadingGridService.stop();
                    gridOptions.columnDefs = columns;

                    this.backendService.getResources(repositoryName, pagination.number, pagination.size)
                        .subscribe(resources => {
                            gridOptions.rowData = resources['_embedded'][repositoryName];

                            observer.next(gridOptions);
                            observer.complete();
                        }, err => {
                            this.loadingGridService.stop();
                            this.notification.createNotificationOnResponse(err);
                            observer.error(err);
                            observer.complete();
                        });
                }, err => {
                    this.loadingGridService.stop();
                    this.notification.createNotificationOnResponse(err);
                    observer.error(err);
                    observer.complete();
                });
        });
    }

}
