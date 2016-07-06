import { provideRouter, RouterConfig }  from '@angular/router';
import { AuthGuard } from './login/login.guard';

import {Dashboard} from './dashboard/dashboard.component';
import {Customers} from './dashboard/customers/customers.component';
import {Finances} from './dashboard/finances/finances.component';
import {DLRTraffic} from './dashboard/dlrtraffic/dlrtraffic.component';
import {SMSTraffic} from './dashboard/smstraffic/smstraffic.component';

import {GSM} from './gsm/gsm.component';
import {Monitoring} from './gsm/monitoring/monitoring.component';
import {Carriers} from './gsm/carriers/carriers.component';
import {Routing} from './gsm/routing/routing.component';
import {Prices} from './gsm/prices/prices.component';
import {MCCMNC} from './gsm/mccmnc/mccmnc.component';
import {SMPP} from './gsm/smpp/smpp.component';
import {API} from './gsm/api/api.component';

import {FinancesMain} from './financesmain/financesmain.component';
import {SystemSettings} from './systemsettings/systemsettings.component';

import {Login}  from './login/login.component';
import {Navigation} from "./navigation/navigation.component";
import {NotFound} from './notfound/notfound.component';

export const routes: RouterConfig = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: Login,
	},
    { path: 'navigation', component: Navigation,
        canActivate:[AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard' },
            {
                path: 'dashboard',
                component: Dashboard,
                children: [
                    { path: '', redirectTo: 'customers'},
                    { path: 'customers', component: Customers,  data: {icon: 'settings_ethernet'} },
                    { path: 'finances', component: Finances, data: {icon: 'settings_input_svideo'} },
                    { path: 'dlrtraffic', component: DLRTraffic, data: {icon: 'settings_applications'} },
                    { path: 'smstraffic', component: SMSTraffic, data: {icon: 'settings_voice'} }
                ],
                data: {
                    showInSubNavigation: true,
                    icon: 'layers',
                    toggle: '/icnDsh'
                }
            },
            {
                path: 'gsm',
                component: GSM,
                children: [
                    { path: '', redirectTo: 'monitoring'},
                    { path: 'monitoring', component: Monitoring, data: {icon: 'assessment'} },
                    { path: 'carriers', component: Carriers, data: {icon: 'book'} },
                    { path: 'routing', component: Routing, data: {icon: 'class'} },
                    { path: 'prices', component: Prices, data: {icon: 'donut_large'} },
                    { path: 'mccmnc', component: MCCMNC, data: {icon: 'eject'} },
                    { path: 'smpp', component: SMPP, data: {icon: 'code'} },
                    { path: 'api', component: API, data: {icon: 'code'} }
                ],
                data: {
                    showInSubNavigation: true,
                    icon: 'settings_remote',
                    toggle: '/icnGsm'
                }
            },
            {
                path: 'financesmain',
                component: FinancesMain,
                data: { showInSubNavigation: true, icon: 'edit' }
            },
            {
                path: 'systemsettings',
                component: SystemSettings,
                data: { showInSubNavigation: true, icon: 'settings' }
            }
        ]},
    { path: '**', component: NotFound },
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
