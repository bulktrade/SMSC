import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
    constructor() {
    }

    start() {
        localStorage.setItem('loading', 'start');
    }

    stop() {
        localStorage.setItem('loading', 'stop');
    }

    isRunning() {
        if(localStorage.getItem('loading') === 'start') {
            return true;
        } else {
            return false;
        }
    }
}
