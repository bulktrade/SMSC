import {RouteConfig, Router} from "angular2/router";
import {Component} from "angular2/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {LoggedInRouterOutlet} from "../authentication/LoggedInOutlet";
import {CORE_DIRECTIVES} from "angular2/common";

import {Customers} from "../customers/customers";
import {Finances} from "../finances/finances";
import {DLRTraffic} from "../dlrtraffic/dlrtraffic";
import {SMSTraffic} from "../smstraffic/smstraffic";

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

    constructor(public router:Router, public translate:TranslateService) {
        console.log(this.router);
    }

}