import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {SMSTraffic} from '../smstraffic/smstraffic';
import {DLRTraffic} from '../dlrtraffic/dlrtraffic';
import {Finances} from '../finances/finances';
import {Customers} from '../customers/customers';
import {Monitoring} from '../monitoring/monitoring';
import {Carriers} from '../carriers/carriers';
import {Routing} from '../routing/routing';
import {Prices} from '../prices/prices';
import {MCCMNC} from '../mccmnc/mccmnc';
import {SMPP} from '../smpp/smpp';
import {API} from '../api/api';
import {SystemSettings} from '../systemsettings/systemsettings';

@Component({
    selector: 'navigation',
    providers: [],
    templateUrl: 'app/components/navigation/navigation.html',
    styleUrls: ['../../assets/css/style.css'],
    directives: [ROUTER_DIRECTIVES],
    pipes: [],
})

@RouteConfig([
    { path: '/smstraffic', component: SMSTraffic, name: 'SMSTraffic', useAsDefault: true},
    { path: '/dlrtraffic', component: DLRTraffic, name: 'DLRTraffic'},
    { path: '/finances', component: Finances, name: 'Finances' },
    { path: '/customers', component: Customers, name: 'Customers' },
    { path: '/monitoring', component: Monitoring, name: 'Monitoring' },
    { path: '/carriers', component: Carriers, name: 'Carriers' },
    { path: '/routing', component: Routing, name: 'Routing' },
    { path: '/prices', component: Prices, name: 'Prices' },
    { path: '/mccmnc', component: MCCMNC, name: 'MCCMNC' },
    { path: '/smpp', component: SMPP, name: 'SMPP' },
    { path: '/api', component: API, name: 'API' },
    { path: '/systemsettings', component: SystemSettings, name: 'SystemSettings' },
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