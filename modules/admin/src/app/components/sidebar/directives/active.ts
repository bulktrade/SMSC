import {Directive} from 'angular2/core';
import {Router, Location} from 'angular2/router';

@Directive({
    selector: '[active-item]',
    exportAs: 'active'
})
export class ActiveItem {
    constructor(public router:Router, public location:Location) {
    }

    isActiveMainItem(path) {
        return this.location.path().indexOf(path.toLowerCase()) !== -1;
    }

    isActiveSubDashboard(path) {
        return this.location.path() === '/navigation/dashboard/' + path;
    }

    isActiveSubGSM(path) {
        return this.location.path() === '/navigation/gsm/' + path;
    }

}