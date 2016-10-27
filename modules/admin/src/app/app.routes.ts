import { Routes } from '@angular/router';
import { AuthGuard } from './common/authGuard';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomersComponent } from './customers/customers.components';
import { CrudComponent } from './crud/crud.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { CrudMetaDataComponent } from './crudMetadata/crudMetaData.components';
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
import { CrudModule } from './crud/crud.module';
import { DashboardModule } from './dashboards/dashboard.module';

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
                path: 'dashboard',
                component: DashboardsComponent,
                loadChildren: () => DashboardModule,
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
                        loadChildren: () => CrudModule,
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
                                loadChildren: () => CrudModule,
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
                                loadChildren: () => CrudModule,
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
                                loadChildren: () => CrudModule,
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
                                loadChildren: () => CrudModule,
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
