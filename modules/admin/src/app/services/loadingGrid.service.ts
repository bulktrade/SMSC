import { Injectable } from "@angular/core";
import { CrudService } from "../crud/crud.service";
import { ServiceNotifications } from "./serviceNotification";

@Injectable()
export class LoadingGridService {
    public loadingGridData = false;
    public crudService: CrudService;

    constructor(public serviceNotifications:ServiceNotifications) {
    }

    run() {
        this.start();

        this.crudService.crud.then((res) => {
            this.crudService.initGridData.then((res) => {
                this.stop();
            }, (error) => {
                this.failure(error);
            });
        }, (error) => {
            this.failure(error);
        });
    }

    failure(error) {
        this.serviceNotifications.createNotificationOnResponse(error);
        this.stop();
    }

    start() {
        this.loadingGridData = true;
    }

    stop() {
        this.loadingGridData = false;
    }
}
