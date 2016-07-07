import {RouterConfig} from '@angular/router';
import {Dashboard} from './dashboard.component';
import {Customers} from './customers/customers.component';
import {Finances} from './finances/finances.component';
import {DLRTraffic} from './dlrtraffic/dlrtraffic.component';
import {SMSTraffic} from './smstraffic/smstraffic.component';
import {DashboardGuard} from './dashboard.guard';

export const DashboardRoutes: RouterConfig = [
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
        },
        canActivate:[DashboardGuard],
    }
];
