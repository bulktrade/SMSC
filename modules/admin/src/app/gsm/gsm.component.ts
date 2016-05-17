import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {CORE_DIRECTIVES} from "@angular/common";

import {Monitoring} from './monitoring/monitoring.component';
import {Carriers} from './carriers/carriers.component';
import {Routing} from './routing/routing.component';
import {Prices} from './prices/prices.component';
import {MCCMNC} from './mccmnc/mccmnc.component';
import {SMPP} from './smpp/smpp.component';
import {API} from './api/api.component';

@Component({
    selector: 'gsm',
    providers: [],
    templateUrl: 'app/gsm/gsm.html',
    styles: [
        require('./gsm.scss')
    ],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    pipes: [TranslatePipe]
})

@RouteConfig([
    {path: '/monitoring', component: Monitoring, name: 'Monitoring', useAsDefault: true},
    {path: '/carriers', component: Carriers, name: 'Carriers'},
    {path: '/routing', component: Routing, name: 'Routing'},
    {path: '/prices', component: Prices, name: 'Prices'},
    {path: '/mccmnc', component: MCCMNC, name: 'MCCMNC'},
    {path: '/smpp', component: SMPP, name: 'SMPP'},
    {path: '/api', component: API, name: 'API'},
])

export class GSM {

    constructor(public translate:TranslateService) {
    }

}