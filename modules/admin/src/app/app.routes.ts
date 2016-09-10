import { provideRouter, Routes } from "@angular/router";
import { AuthGuard } from "./common/authGuard";
import { Login } from "./login/login.component";
import { Navigation } from "./navigation/navigation.component";
import { Dashboard } from "./dashboards/dashboard.component";
import { Customers } from "./customers/customers.components";
import { Crud } from "./crud/crud.component";
import { NotFound } from "./notFound/notFound.component";
import { CrudMetaData } from "./crudMetadata/crudMetaData.components";
import { CRUD_ROUTE_PROVIDER } from "./crud/crud.routes";
import { CrudMetaGridData } from "./crudMetadata/crudMetaGridData/crudMetaGridData.component";
import { CrudMetaFormData } from "./crudMetadata/crudMetaFormData/crudMetaFormData.component";
import { CrudClassMetaData } from "./crudMetadata/crudClassMetaData/crudClassMetaData.component";
import { CrudView } from "./crud/crudView/crud.view.component";
import { CrudDelete } from "./crud/crudDelete/crud.delete.component";
import { CrudCreate } from "./crud/crudCreate/crud.create.component";
import { CrudEdit } from "./crud/crudEdit/crud.edit.component";
import { CrudViewResolve } from "./crud/crudView/crud.view.resolve";
import { CrudLinkset } from "./crud/crudLinkset/crud.linkset.component";
import { CrudLinksetResolve } from "./crud/crudLinkset/crud.linkset.resolve";
import { CrudCreateResolve } from "./crud/crudCreate/crud.create.resolve";
import { CrudEditResolve } from "./crud/crudEdit/crud.edit.resolve";
import { Dashboards } from "./dashboards/dashboards.components";
import { DashboardView } from "./dashboards/dashboard.view.component";

const DASHBOARD_ROUTER_PROVIDER = [
    {
        path: '',
        component: Dashboard,
        data: {
            showInSubNavigation: true,
            icon: 'layers',
            crudClass: 'Dashboard',
            dashboard: 'default'
        },
        children: [
            { path: '', component: DashboardView },
            { path: 'delete/:id', component: CrudDelete },
            { path: 'edit/:id', component: CrudEdit, resolve: { edit: CrudEditResolve } },
            { path: 'create', component: CrudCreate, resolve: { create: CrudCreateResolve } },
            { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } }
        ]
    },
    {
        path: ':dashboard',
        component: Dashboard,
        data: {
            crudClass: 'Dashboard'
        },
        children: [
            { path: '', component: DashboardView },
            { path: 'delete/:id', component: CrudDelete },
            { path: 'edit/:id', component: CrudEdit, resolve: { edit: CrudEditResolve } },
            { path: 'create', component: CrudCreate, resolve: { create: CrudCreateResolve } },
            { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } }
        ]
    }
];

const routes = [
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
                path: 'metadata',
                component: CrudMetaData,
                data: {
                    showInSubNavigation: true,
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
                        path: 'grid',
                        component: CrudMetaGridData,
                        data: {
                            showInSubNavigation: true,
                            paramsAsDefault: '',
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
                            paramsAsDefault: '',
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

export const APP_ROUTE_PROVIDER = provideRouter(routes);
