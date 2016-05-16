import {RouteConfig} from "@angular/router-deprecated";
import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoggedInRouterOutlet} from "../app.router-outlet";
import {CORE_DIRECTIVES} from "@angular/common";

import {Customers} from "../customers/customers.component";
import {Finances} from "../finances/finances.component";
import {DLRTraffic} from "../dlrtraffic/dlrtraffic.component";
import {SMSTraffic} from "../smstraffic/smstraffic.component";

@Component({
    selector: 'dashboard',
    providers: [],
    templateUrl: 'app/components/dashboard/dashboard.html',
    styles: [
        require('./dashboard.scss')
    ],
    directives: [LoggedInRouterOutlet, CORE_DIRECTIVES],
    pipes: [TranslatePipe]
})

@RouteConfig([
    {path: '/smstraffic', component: SMSTraffic, name: 'SMSTraffic', useAsDefault: true},
    {path: '/dlrtraffic', component: DLRTraffic, name: 'DLRTraffic'},
    {path: '/finances', component: Finances, name: 'Finances'},
    {path: '/customers', component: Customers, name: 'Customers'},
])

export class Dashboard {

    constructor(public translate:TranslateService) {
    }

}