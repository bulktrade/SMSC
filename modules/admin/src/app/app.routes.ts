import { provideRouter, RouterConfig } from "@angular/router";
import { AuthGuard } from "./common/authGuard";
import { Login } from "./login/login.component";
import { Navigation } from "./navigation/navigation.component";
import { SystemSettings } from "./systemsettings/systemSettings.component";
import { Dashboard } from "./dashboard/dashboard.component";
import { Customers } from "./customers/customers.components";
import { Crud } from "./crud/crud";
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
                    icon: 'perm_contact_calendar',
                    crudClass: 'Customer'
                },
                children: [
                    { path: '',  component: Crud },
                    {
                        path: ':action/:id',
                        component: Crud
                    },
                    {
                        path: ':action',
                        component: Crud
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
