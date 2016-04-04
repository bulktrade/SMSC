import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {Main} from '../main/main';
import {Finances} from '../finances/finances';
import {Customers} from '../customers/customers';
import {MCCMNC} from '../mccmnc/mccmnc';
import {Prices} from '../prices/prices';
import {Provider} from '../provider/provider';
import {Routing} from '../routing/routing';

@Component({
    selector: 'navigation',
    providers: [],
    templateUrl: 'app/components/navigation/navigation.html',
    styleUrls: ['../../assets/css/style.css'],
    directives: [ROUTER_DIRECTIVES],
    pipes: [],
})

@RouteConfig([
    { path: '/main', component: Main, name: 'Main', useAsDefault: true},
    { path: '/finances', component: Finances, name: 'Finances' },
    { path: '/mccmnc', component: MCCMNC, name: 'MCCMNC' },
    { path: '/prices', component: Prices, name: 'Prices' },
    { path: '/provider', component: Provider, name: 'Provider' },
    { path: '/routing', component: Routing, name: 'Routing' },
    { path: '/customers', component: Customers, name: 'Customers' },
])

export class Navigation {
    constructor(public router: Router) {
    }

    onSelect(route) {
        this.router.navigate([route]);
    }

    logout() {
        document.cookie = 'rightWrite=true;expires=Mon, ' +
            '01-Jan-2000 00:00:00 GMT';
        this.router.parent.navigate(['Login']);
    }
}