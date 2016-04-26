import {Directive} from 'angular2/core';
import {Router, Location} from 'angular2/router';

@Directive({
    selector: '[active-item]',
    exportAs: 'active'
})
export class ActiveItem {
    constructor(public router:Router, public location:Location) {
    }

    private dashboardMenu = [
        'SMSTraffic',
        'DLRTraffic',
        'Finances',
        'Customers'
    ];

    private GSMMenu = [
        'Monitoring',
        'Carriers',
        'Routing',
        'Prices',
        'MCCMNC',
        'SMPP',
        'API'
    ];

    isActiveMainDashboard() {
        for (let item in this.dashboardMenu) {
            if (this.router.isRouteActive(this.router.generate(['./Dashboard',
                    this.dashboardMenu[item]]))) {
                return true;
            }
        }

        return false;
    }

    isActiveMainGSM() {
        for (let item in this.GSMMenu) {
            if (this.router.isRouteActive(this.router.generate(['./GSM',
                    this.GSMMenu[item]]))) {
                return true;
            }
        }

        return false;
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