import {ROUTER_DIRECTIVES} from '@angular/router';
import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {CORE_DIRECTIVES} from '@angular/common';

import {Customers} from './customers/customers.component';
import {Finances} from './finances/finances.component';
import {DLRTraffic} from './dlrtraffic/dlrtraffic.component';
import {SMSTraffic} from './smstraffic/smstraffic.component';

@Component({
    selector: 'dashboard',
    providers: [],
    template: require('./dashboard.html'),
    styleUrls: [
        // require('./dashboard.scss')
    ],
    directives: [//ROUTER_DIRECTIVES,
        CORE_DIRECTIVES],
    pipes: [TranslatePipe]
})

/*@RouteConfig([
    {path: '/smstraffic', component: SMSTraffic, name: 'SMSTraffic',
        data: {icon: 'settings_ethernet'}, useAsDefault: true},
    {path: '/dlrtraffic', component: DLRTraffic, name: 'DLRTraffic',
        data: {icon: 'settings_input_svideo'}},
    {path: '/finances', component: Finances, name: 'Finances',
        data: {icon: 'settings_applications'}},
    {path: '/customers', component: Customers, name: 'Customers',
        data: {icon: 'settings_voice'}}
])*/

export class Dashboard {

    constructor(public translate: TranslateService) {
    }

}
