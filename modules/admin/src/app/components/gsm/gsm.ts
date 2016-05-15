import {RouteConfig} from "@angular/router";
import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoggedInRouterOutlet} from "../authentication/LoggedInOutlet";
import {CORE_DIRECTIVES} from "@angular/common";

import {Monitoring} from '../monitoring/monitoring';
import {Carriers} from '../carriers/carriers';
import {Routing} from '../routing/routing';
import {Prices} from '../prices/prices';
import {MCCMNC} from '../mccmnc/mccmnc';
import {SMPP} from '../smpp/smpp';
import {API} from '../api/api';

@Component({
    selector: 'gsm',
    providers: [],
    templateUrl: 'app/components/gsm/gsm.html',
    styles: [
        require('./gsm.scss')
    ],
    directives: [LoggedInRouterOutlet, CORE_DIRECTIVES],
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