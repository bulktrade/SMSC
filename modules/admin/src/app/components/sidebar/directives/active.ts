import {Directive} from 'angular2/core';
import {Router, Location} from 'angular2/router';

@Directive({
    selector: '[active-item]',
    exportAs: 'active'
})
export class ActiveItem {
    constructor(public router:Router, public location:Location) {
    }

    isActiveMainDashboard() {
        return this.location.path().indexOf('dashboard') !== -1;
    }
    
    isActiveMainGSM() {
        return this.location.path().indexOf('gsm') !== -1;
    }

    isActiveSubNavigation(title) {
        return this.router.isRouteActive(this.router.generate([title]));
    }

    isActiveSubDashboard(path) {
        return this.location.path() === '/navigation/dashboard/' + path;
    }

    isActiveSubGSM(path) {
        return this.location.path() === '/navigation/gsm/' + path;
    }

}