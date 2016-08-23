import { Injectable } from "@angular/core";

@Injectable()
export class LoadingGridService {
    public loadingGridData = false;

    constructor() {
    }

    start() {
        this.loadingGridData = true;
    }

    stop() {
        this.loadingGridData = false;
    }
}
