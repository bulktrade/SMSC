import { Injectable } from "@angular/core";
import { CrudService } from "../crud/crud.service";

@Injectable()
export class LoadingGridService {
    public loadingGridData = false;
    public crudService: CrudService;

    constructor() {
    }

    run() {
        this.start();

        this.crudService.crud.then(() => {
            this.crudService.initGridData.then(() => {
                this.stop();
            })
        });
    }

    start() {
        this.loadingGridData = true;
    }

    stop() {
        this.loadingGridData = false;
    }
}
