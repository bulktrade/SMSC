import { provideRouter, RouterConfig } from "@angular/router";
import { AuthGuard } from "./common/authGuard";
import { Login } from "./login/login.component";
import { Navigation } from "./navigation/navigation.component";
import { Dashboard } from "./dashboard/dashboard.component";
import { Customers } from "./customers/customers.components";
import { Crud } from "./crud/crud.component";
import { NotFound } from "./notFound/notFound.component";
import { CrudView } from "./crud/crudView/crud.view";
import { CrudDelete } from "./crud/crudDelete/crud.delete";
import { CrudCreate } from "./crud/crudCreate/crud.create";
import {CrudEdit} from "./crud/crudEdit/crud.edit";
import {TeamResolver} from "./common/teamResolver";

const routes:RouterConfig = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Navigation,
        canActivate: [AuthGuard],
        resolve: [TeamResolver],
        children: [
            {
                path: '',
                component: Dashboard,
                resolve: [TeamResolver],
                data: {
                    showInSubNavigation: true,
                    icon: 'layers'
                }
            },
            {
                path: 'customers',
                component: Customers,
                resolve: [TeamResolver],
                data: {
                    showInSubNavigation: true,
                    paramsAsDefault: '',
                    icon: 'perm_contact_calendar',
                    crudClass: 'Customer'
                },
                children: [
                    {
                        path: '',
                        component: Crud,
                        resolve: [TeamResolver],
                        children: [
                            { path: '',  component: CrudView, resolve: [TeamResolver] },
                            { path: 'delete',  component: CrudDelete, resolve: [TeamResolver] },
                            { path: 'create',  component: CrudCreate, resolve: [TeamResolver] },
                            { path: 'edit',  component: CrudEdit, resolve: [TeamResolver] },

                            { path: ':id',  component: CrudView },
                            { path: 'delete/:id',  component: CrudDelete, resolve: [TeamResolver] },
                            { path: 'create/:id',  component: CrudCreate, resolve: [TeamResolver] },
                            { path: 'edit/:id',  component: CrudEdit, resolve: [TeamResolver] },
                        ]
                    }
                ]
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
