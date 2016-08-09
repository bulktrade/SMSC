import {NavigationStart, NavigationEnd} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class NavigationInterceptor {
    public loading:boolean = false;

    constructor() {
    }

    intercept(event):void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }
    }
}
