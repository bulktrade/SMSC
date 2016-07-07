import {provideRouter, RouterConfig} from "@angular/router";
import {AuthGuard} from "./login/login.guard";
import {GSM} from "./gsm/gsm.component";
import {Monitoring} from "./gsm/monitoring/monitoring.component";
import {Carriers} from "./gsm/carriers/carriers.component";
import {Routing} from "./gsm/routing/routing.component";
import {Prices} from "./gsm/prices/prices.component";
import {MCCMNC} from "./gsm/mccmnc/mccmnc.component";
import {SMPP} from "./gsm/smpp/smpp.component";
import {API} from "./gsm/api/api.component";
import {FinancesMain} from "./financesmain/financesmain.component";
import {SystemSettings} from "./systemsettings/systemsettings.component";
import {Login} from "./login/login.component";
import {Navigation} from "./navigation/navigation.component";
import {NotFound} from "./notfound/notfound.component";
import {DashboardRoutes} from "./dashboard/dashboard.routs";

export const routes:RouterConfig = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: '',
        component: Navigation,
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: 'gsm'},
            {
                path: 'gsm',
                component: GSM,
                children: [
                    {path: '', redirectTo: 'monitoring'},
                    {path: 'monitoring', component: Monitoring, data: {icon: 'assessment'}},
                    {path: 'carriers', component: Carriers, data: {icon: 'book'}},
                    {path: 'routing', component: Routing, data: {icon: 'class'}},
                    {path: 'prices', component: Prices, data: {icon: 'donut_large'}},
                    {path: 'mccmnc', component: MCCMNC, data: {icon: 'eject'}},
                    {path: 'smpp', component: SMPP, data: {icon: 'code'}},
                    {path: 'api', component: API, data: {icon: 'code'}}
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
                data: {showInSubNavigation: true, icon: 'edit'}
            },
            {
                path: 'systemsettings',
                component: SystemSettings,
                data: {showInSubNavigation: true, icon: 'settings'}
            }
        ]
    },
    ...DashboardRoutes,
    {path: '**', component: NotFound},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
