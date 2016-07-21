import { provideRouter, RouterConfig } from "@angular/router";
import { AuthGuard } from "./common/authGuard";
import { Login } from "./login/login.component";
import { Navigation } from "./navigation/navigation.component";
import { SystemSettings } from "./systemsettings/systemsettings.component";
import { Dashboard } from "./dashboard/dashboard.component";
import { Customers } from "./customers/customers.components";
import { CustomersCrud } from "./customers/customers.crud";
import { NotFound } from "./notFound/notFound.component";

const routes:RouterConfig = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Navigation,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                component: Dashboard,
                data: {
                    showInSubNavigation: true,
                    icon: 'layers'
                }
            },
            {
                path: 'customers',
                component: Customers,
                data: {
                    showInSubNavigation: true,
                    paramsAsDefault: '',
                    icon: 'perm_contact_calendar'
                },
                children: [
                    { path: '', redirectTo: ' ', pathMatch: 'full' },
                    {
                        path: ':action/:id',
                        component: CustomersCrud
                    },
                    {
                        path: ':action',
                        component: CustomersCrud
                    }
                ]
            },
            {
                path: 'settings',
                component: SystemSettings,
                data: {
                    showInSubNavigation: true,
                    icon: 'settings'
                }
            }
        ]
    },
    {
        path: '**',
        component: NotFound
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];
