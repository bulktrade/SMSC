import { Routes } from '@angular/router';
import { AuthGuard } from './common/authGuard';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomersComponent } from './customers/customers.components';
import { CrudComponent } from './crud/crud.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { CrudMetaDataComponent } from './crudMetadata/crudMetaData.components';
import { CRUD_ROUTE_PROVIDER } from './crud/crud.routes';
import {
    CrudMetaGridDataComponent
} from './crudMetadata/crudMetaGridData/crudMetaGridData.component';
import {
    CrudMetaFormDataComponent
} from './crudMetadata/crudMetaFormData/crudMetaFormData.component';
import {
    CrudClassMetaDataComponent
} from './crudMetadata/crudClassMetaData/crudClassMetaData.component';
import {
    MetaDataPropertyBindingParameterComponent
} from './crudMetadata/metaDataBindingParameter/metaDataBindingParameter.component';
import { DashboardsComponent } from './dashboards/dashboards.components';
import { DashboardComponent } from './dashboards/dashboard.component';
import { DASHBOARD_CRUD_ROUTE_PROVIDER } from './dashboards/crud/dashboardCrudProviders';

const DASHBOARD_ROUTER_PROVIDER = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            showInBreadcrumb: false,
            showInSubNavigation: false,
            translationKey: 'Dashboard',
            icon: 'layers',
            crudClass: 'DashboardBox',
            dashboard: 'default'
        },
        children: DASHBOARD_CRUD_ROUTE_PROVIDER
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            crudClass: 'DashboardBox',
            showInBreadcrumb: false
        },
        children: DASHBOARD_CRUD_ROUTE_PROVIDER
    }
];

export const ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: NavigationComponent,
        canActivate: [AuthGuard],
        data: {
            showInBreadcrumb: false
        },
        children: [
            {
                path: '',
                component: DashboardsComponent,
                children: DASHBOARD_ROUTER_PROVIDER,
                data: {
                    similarPath: 'dasboards', // @todo Impement in sidenav
                    showInSubNavigation: true,
                    translationKey: 'Dashboards',
                    icon: 'layers',
                    showInBreadcrumb: false
                }
            },
            {
                path: 'customers',
                component: CustomersComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'Customers',
                    showInSubNavigation: true,
                    icon: 'perm_contact_calendar',
                    crudClass: 'Customer'
                },
                children: [
                    {
                        path: '',
                        component: CrudComponent,
                        children: CRUD_ROUTE_PROVIDER,
                        data: {
                            showInBreadcrumb: false,
                        }
                    }
                ]
            },
            {
                path: 'metadata',
                component: CrudMetaDataComponent,
                data: {
                    showInSubNavigation: true,
                    translationKey: 'CrudMetaData',
                    icon: 'perm_contact_calendar',
                    showInBreadcrumb: true
                },
                children: [
                    {
                        path: '',
                        component: CrudClassMetaDataComponent,
                        data: {
                            showInSubNavigation: true,
                            translationKey: 'CrudClassMetaData',
                            icon: 'perm_data_setting',
                            crudClass: 'CrudClassMetaData',
                            showInBreadcrumb: true,
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                children: CRUD_ROUTE_PROVIDER,
                                data: {
                                    showInBreadcrumb: false,
                                }
                            }
                        ]
                    },
                    {
                        path: 'binding',
                        component: MetaDataPropertyBindingParameterComponent,
                        data: {
                            showInSubNavigation: true,
                            showInBreadcrumb: true,
                            translationKey: 'MetaDataPropertyBindingParameter',
                            icon: 'perm_data_setting',
                            crudClass: 'MetaDataPropertyBindingParameter'
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                children: CRUD_ROUTE_PROVIDER,
                                data: {
                                    showInBreadcrumb: true,
                                }
                            }
                        ]
                    },
                    {
                        path: 'grid',
                        component: CrudMetaGridDataComponent,
                        data: {
                            showInSubNavigation: true,
                            translationKey: 'CrudMetaGridData',
                            icon: 'grid_on',
                            crudClass: 'CrudMetaGridData',
                            showInBreadcrumb: true
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                children: CRUD_ROUTE_PROVIDER,
                                data: {
                                    showInBreadcrumb: false,
                                }
                            }
                        ]
                    },
                    {
                        path: 'form',
                        component: CrudMetaFormDataComponent,
                        data: {
                            showInSubNavigation: true,
                            translationKey: 'CrudMetaFormData',
                            icon: 'format_shapes',
                            crudClass: 'CrudMetaFormData',
                            showInBreadcrumb: true
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                children: CRUD_ROUTE_PROVIDER,
                                data: {
                                    showInBreadcrumb: false,
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
