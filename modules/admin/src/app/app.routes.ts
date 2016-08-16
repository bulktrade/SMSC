import { provideRouter, RouterConfig } from "@angular/router";
import { AuthGuard } from "./common/authGuard";
import { Login } from "./login/login.component";
import { Navigation } from "./navigation/navigation.component";
import { Dashboard } from "./dashboard/dashboard.component";
import { Customers } from "./customers/customers.components";
import { Crud } from "./crud/crud.component";
import { NotFound } from "./notFound/notFound.component";
import { CrudMetaData } from "./crudMetadata/crudMetaData.components";
import { CRUD_ROUTE_PROVIDER } from "./crud/crud.routes";
import { CrudMetaGridData } from "./crudMetadata/crudMetaGridData/crudMetaGridData.component";
import { CrudMetaFormData } from "./crudMetadata/crudMetaFormData/crudMetaFormData.component";
import { CrudClassMetaData } from "./crudMetadata/crudClassMetaData/crudClassMetaData.component";

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
                    {
                        path: '',
                        component: Crud,
                        children: CRUD_ROUTE_PROVIDER
                    }
                ]
            },
            {
                path: 'crud/metadata',
                component: CrudMetaData,
                data: {
                    showInSubNavigation: false,
                    paramsAsDefault: '',
                    icon: 'perm_contact_calendar'
                },
                children: [
                    {
                        path: '',
                        component: CrudClassMetaData,
                        data: {
                            showInSubNavigation: true,
                            paramsAsDefault: '',
                            icon: 'perm_contact_calendar',
                            crudClass: 'CrudClassMetaData'
                        },
                        children: [
                            {
                                path: '',
                                component: Crud,
                                children: CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'grid',
                        component: CrudMetaGridData,
                        data: {
                            showInSubNavigation: true,
                            paramsAsDefault: '',
                            icon: 'perm_contact_calendar',
                            crudClass: 'CrudMetaGridData'
                        },
                        children: [
                            {
                                path: '',
                                component: Crud,
                                children: CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'form',
                        component: CrudMetaFormData,
                        data: {
                            showInSubNavigation: true,
                            paramsAsDefault: '',
                            icon: 'perm_contact_calendar',
                            crudClass: 'CrudMetaFormData'
                        },
                        children: [
                            {
                                path: '',
                                component: Crud,
                                children: CRUD_ROUTE_PROVIDER
                            }
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

export const APP_ROUTE_PROVIDER = provideRouter(routes);
