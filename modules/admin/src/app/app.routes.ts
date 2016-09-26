import { Routes } from '@angular/router';
import { AuthGuard } from './common/authGuard';
import { Login } from './login/login.component';
import { Navigation } from './navigation/navigation.component';
import { Customers } from './customers/customers.components';
import { Crud } from './crud/crud.component';
import { NotFound } from './notFound/notFound.component';
import { CrudMetaData } from './crudMetadata/crudMetaData.components';
import { CRUD_ROUTE_PROVIDER } from './crud/crud.routes';
import { CrudMetaGridData } from './crudMetadata/crudMetaGridData/crudMetaGridData.component';
import { CrudMetaFormData } from './crudMetadata/crudMetaFormData/crudMetaFormData.component';
import { CrudClassMetaData } from './crudMetadata/crudClassMetaData/crudClassMetaData.component';
import {
    MetaDataPropertyBindingParameter
} from './crudMetadata/metaDataBindingParameter/metaDataBindingParameter';
import { DashboardView } from "./dashboards/dashboard.view.component";
import { DashboardCrudUpdate } from "./dashboards/crud/dashboard.box.update";
import { DashboardCrudUpdateResolve } from "./dashboards/crud/dashboard.crud.update.resolve";
import { DashboardCrudCreate } from "./dashboards/crud/dashboard.box.create";
import { DashboardCrudCreateResolve } from "./dashboards/crud/dashboard.crud.create.resolve";
import { CrudLinkset } from "./crud/crudLinkset/crud.linkset.component";
import { CrudLinksetResolve } from "./crud/crudLinkset/crud.linkset.resolve";
import { Dashboards } from "./dashboards/dashboards.components";
import { Dashboard } from "./dashboards/dashboard.component";

const DASHBOARD_ROUTER_PROVIDER = [
    {
        path: '',
        component: Dashboard,
        data: {
            showInSubNavigation: false,
            icon: 'layers',
            crudClass: 'DashboardBox',
            dashboard: 'default'
        },
        children: [
            { path: '', component: DashboardView },
            { path: 'edit/:id', component: DashboardCrudUpdate, resolve: { edit: DashboardCrudUpdateResolve } },
            { path: 'create/:className', component: DashboardCrudCreate, resolve: { create: DashboardCrudCreateResolve } },
            { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } }
        ]
    },
    {
        path: 'dashboard',
        component: Dashboard,
        data: {
            crudClass: 'DashboardBox'
        },
        children: [
            { path: '', component: DashboardView },
            { path: 'edit/:id', component: DashboardCrudUpdate, resolve: { edit: DashboardCrudUpdateResolve } },
            { path: 'create/:className', component: DashboardCrudCreate, resolve: { create: DashboardCrudCreateResolve } },
            { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } }
        ]
    }
];

export const ROUTES: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Navigation,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: Dashboards,
                children: DASHBOARD_ROUTER_PROVIDER,
                data: {
                    similarPath: 'dasboards'//@todo Impement in sidenav
                }
            },
            {
                path: 'dashboards',
                component: Dashboards,
                data: {
                    showInSubNavigation: true,
                    icon: 'layers'
                },
                children: DASHBOARD_ROUTER_PROVIDER
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
                path: 'customers',
                component: Customers,
                data: {
                    showInSubNavigation: true,
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
                path: 'metadata',
                component: CrudMetaData,
                data: {
                    showInSubNavigation: true,
                    icon: 'perm_contact_calendar'
                },
                children: [
                    {
                        path: '',
                        component: CrudClassMetaData,
                        data: {
                            showInSubNavigation: true,
                            icon: 'perm_data_setting',
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
                        path: 'binding',
                        component: MetaDataPropertyBindingParameter,
                        data: {
                            showInSubNavigation: true,
                            icon: 'perm_data_setting',
                            crudClass: 'MetaDataPropertyBindingParameter'
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
                            icon: 'grid_on',
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
                            icon: 'format_shapes',
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
