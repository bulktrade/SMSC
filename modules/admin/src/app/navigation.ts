import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Main} from './components/main/main';
import {Finances} from './components/finances/finances';
import {Customers} from './components/customers/customers';
import {MCCMNC} from './components/mccmnc/mccmnc';
import {Prices} from './components/prices/prices';
import {Provider} from './components/provider/provider';
import {Routing} from './components/routing/routing';

@Component({
    selector: 'navigation',
    providers: [],
    templateUrl: 'app/navigation.html',
    styleUrls: ['assets/css/style.css'],
    directives: [ROUTER_DIRECTIVES],
    pipes: []
})

@RouteConfig([
    { path: './components/main/main', component: Main, name: 'Main' },
    { path: './components/finances/finances', component: Finances, name: 'Finances' },
    { path: './components/mccmnc/mccmnc', component: MCCMNC, name: 'MCCMNC' },
    { path: './components/prices/prices', component: Prices, name: 'Prices' },
    { path: './components/provider/provider', component: Provider, name: 'Provider' },
    { path: './components/routing/routing', component: Routing, name: 'Routing' },
    { path: './components/customers/customers', component: Customers, name: 'Customers' }
])

export class Navigation {
    constructor() {}
}