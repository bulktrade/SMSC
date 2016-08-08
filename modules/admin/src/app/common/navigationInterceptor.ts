import { NavigationEnd } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class NavigationInterceptor {

    constructor() {
    }

    intercept(event):void {
        if (event instanceof NavigationEnd) {
            this.stopLoadingIcon();
        }
    }

    startLoadingIcon() {
        localStorage.setItem('loading', 'start');
    }

    stopLoadingIcon() {
        localStorage.setItem('loading', 'stop');
    }

    isRunningLoadingIcon() {
        if(localStorage.getItem('loading') === 'start') {
            return true;
        } else {
            return false;
        }
    }
}
