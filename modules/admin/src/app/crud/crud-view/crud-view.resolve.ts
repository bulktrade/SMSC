import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crud-resolve";
import { CrudService } from "../crud.service";
import { LoadingGridService } from "../../services/loading/loading-grid.service";
import { Observable } from "rxjs";
import { NotificationService } from "../../services/notification-service";
import { GridOptions } from "../model/grid-options";
import { BackendService } from "../../services/backend/backend.service";

@Injectable()
export class CrudViewResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public loadingGridService: LoadingGridService,
                public notification: NotificationService,
                public backendService: BackendService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let gridOptions: GridOptions = <GridOptions>{};
        this.loadingGridService.start();

        return Observable.create((observer) => {
            this.crudService.getGridColumnDefs(this.crudService.getClassName())
                .subscribe((columns) => {
                    this.loadingGridService.stop();
                    gridOptions.columnDefs = columns;

                    this.backendService.getResources(this.crudService.getRepositoryName())
                        .subscribe(resources => {
                            gridOptions.rowData = resources;

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
