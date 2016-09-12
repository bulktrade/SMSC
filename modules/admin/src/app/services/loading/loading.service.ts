import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
    private _loading = false;

    constructor() {
    }

    start() {
        this._loading = true;
    }

    stop() {
        this._loading = false;
    }

    get loading(): boolean {
        return this._loading;
    }
}
