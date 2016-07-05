import { provideRouter, RouterConfig }  from '@angular/router';

import {Dashboard} from './dashboard/dashboard.component';
import {GSM} from './gsm/gsm.component';

import { App }  from './app.component';
import { Login }  from './login/login.component';
import { Navigation } from "./navigation/navigation.component";

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
        children: [
            { path: '', component: Dashboard },
            { path: 'dashboard', component: Dashboard }
        ]},
    // { path: '**',    component: NotFound },
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
