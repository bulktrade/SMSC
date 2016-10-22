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
import { DashboardViewComponent } from './dashboards/dashboardView.component';
import { DashboardCrudUpdateComponent } from './dashboards/crud/dashboardBoxUpdate.component';
import { DashboardCrudUpdateResolve } from './dashboards/crud/dashboardCrudUpdate.resolve';
import { DashboardCrudCreateComponent } from './dashboards/crud/dashboardBoxCreate.component';
import { DashboardCrudCreateResolve } from './dashboards/crud/dashboardCrudCreate.resolve';
import { CrudLinksetComponent } from './crud/crudLinkset/crudLinkset.component';
import { CrudLinksetResolve } from './crud/crudLinkset/crudLinkset.resolve';
import { DashboardsComponent } from './dashboards/dashboards.components';
import { DashboardComponent } from './dashboards/dashboard.component';

const DASHBOARD_ROUTER_PROVIDER = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            showInSubNavigation: false,
            nameInSubNavigation: 'Dashboard',
            icon: 'layers',
            crudClass: 'DashboardBox',
            dashboard: 'default'
        },
        children: [
            { path: '', component: DashboardViewComponent },
            {
                path: 'edit/:id',
                component: DashboardCrudUpdateComponent,
                resolve: { edit: DashboardCrudUpdateResolve } },
            {
                path: 'create/:className',
                component: DashboardCrudCreateComponent,
                resolve: { create: DashboardCrudCreateResolve }
            },
            {
                path: 'linkset',
                component: CrudLinksetComponent,
                resolve: { linkset: CrudLinksetResolve }
            }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            crudClass: 'DashboardBox'
        },
        children: [
            { path: '', component: DashboardViewComponent },
            {
                path: 'edit/:id',
                component: DashboardCrudUpdateComponent,
                resolve: { edit: DashboardCrudUpdateResolve } },
            {
                path: 'create/:className',
                component: DashboardCrudCreateComponent,
                resolve: { create: DashboardCrudCreateResolve }
            },
            {
                path: 'linkset',
                component: CrudLinksetComponent,
                resolve: { linkset: CrudLinksetResolve }
            }
        ]
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
        children: [
            {
                path: '',
                component: DashboardsComponent,
                children: DASHBOARD_ROUTER_PROVIDER,
                data: {
                    similarPath: 'dasboards', // @todo Impement in sidenav
                    showInSubNavigation: true,
                    nameInSubNavigation: 'Dashboards',
                    icon: 'layers'
                }
            },
            {
                path: 'customers',
                component: CustomersComponent,
                data: {
                    showInSubNavigation: true,
                    nameInSubNavigation: 'Customers',
                    icon: 'perm_contact_calendar',
                    crudClass: 'Customer'
                },
                children: [
                    {
                        path: '',
                        component: CrudComponent,
                        children: CRUD_ROUTE_PROVIDER
                    }
                ]
            },
            {
                path: 'metadata',
                component: CrudMetaDataComponent,
                data: {
                    showInSubNavigation: true,
                    nameInSubNavigation: 'CrudMetaData',
                    icon: 'perm_contact_calendar'
                },
                children: [
                    {
                        path: '',
                        component: CrudClassMetaDataComponent,
                        data: {
                            showInSubNavigation: true,
                            nameInSubNavigation: 'CrudClassMetaData',
                            icon: 'perm_data_setting',
                            crudClass: 'CrudClassMetaData'
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                children: CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'binding',
                        component: MetaDataPropertyBindingParameterComponent,
                        data: {
                            showInSubNavigation: true,
                            nameInSubNavigation: 'MetaDataPropertyBindingParameter',
                            icon: 'perm_data_setting',
                            crudClass: 'MetaDataPropertyBindingParameter'
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                children: CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'grid',
                        component: CrudMetaGridDataComponent,
                        data: {
                            showInSubNavigation: true,
                            nameInSubNavigation: 'CrudMetaGridData',
                            icon: 'grid_on',
                            crudClass: 'CrudMetaGridData'
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                children: CRUD_ROUTE_PROVIDER
                            }
                        ]
                    },
                    {
                        path: 'form',
                        component: CrudMetaFormDataComponent,
                        data: {
                            showInSubNavigation: true,
                            nameInSubNavigation: 'CrudMetaFormData',
                            icon: 'format_shapes',
                            crudClass: 'CrudMetaFormData'
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
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
        component: NotFoundComponent
    }
];
