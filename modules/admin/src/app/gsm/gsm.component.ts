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
    {path: '/monitoring', component: Monitoring, name: 'Monitoring', data: {icon: 'assessment'}, useAsDefault: true},
    {path: '/carriers', component: Carriers, name: 'Carriers', data: {icon: 'book'}},
    {path: '/routing', component: Routing, name: 'Routing', data: {icon: 'class'}},
    {path: '/prices', component: Prices, name: 'Prices', data: {icon: 'donut_large'}},
    {path: '/mccmnc', component: MCCMNC, name: 'MCCMNC', data: {icon: 'eject'}},
    {path: '/smpp', component: SMPP, name: 'SMPP', data: {icon: 'code'}},
    {path: '/api', component: API, name: 'API', data: {icon: 'code'}},
])

export class GSM {

    constructor(public translate:TranslateService) {
    }

}