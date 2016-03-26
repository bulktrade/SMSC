import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './components/home/home';
import {Login} from './components/login/login';
import {Dashboard_1} from './components/dashboard/dashboard_1/dashboard_1';
import {Dashboard_2} from './components/dashboard/dashboard_2/dashboard_2';
import {Dashboard_3} from './components/dashboard/dashboard_3/dashboard_3';
import {Finances} from './components/finances/finances';
import {Customers} from './components/customers/customers';
import {MCC_MNC} from './components/mcc_mnc/mcc_mnc';
import {Prices} from './components/prices/prices';
import {Provider} from './components/provider/provider';
import {Routing} from './components/routing/routing';

@Component({
    selector: 'navigation',
    providers: [Prices],
    templateUrl: 'app/navigation.html',
    styleUrls: ['assets/css/style.css'],
    directives: [ROUTER_DIRECTIVES],
    pipes: []
})

@RouteConfig([
    { path: './components/dashboard/dashboard_1/dashboard_1', component: Dashboard_1, name: 'Dashboard_1' },
    { path: './components/dashboard/dashboard_2/dashboard_2', component: Dashboard_2, name: 'Dashboard_2' },
    { path: './components/dashboard/dashboard_3/dashboard_3', component: Dashboard_3, name: 'Dashboard_3' },
    { path: './components/finances/finances', component: Finances, name: 'Finances' },
    { path: './components/mcc_mnc/mcc_mnc', component: MCC_MNC, name: 'MCC_MNC' },
    { path: './components/prices/prices', component: Prices, name: 'Prices' },
    { path: './components/provider/provider', component: Provider, name: 'Provider' },
    { path: './components/routing/routing', component: Routing, name: 'Routing' },
    { path: './components/customers/customers', component: Customers, name: 'Customers' }
])

export class Navigation {
    constructor() {}
}