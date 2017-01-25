import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./common/auth.guard";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { CustomersComponent } from "./customers/customers.components";
import { CrudComponent } from "./crud/crud.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { CrudMetaDataComponent } from "./crud-meta-data/crud-meta-data.components";
import { CrudMetaGridDataComponent } from "./crud-meta-data/crud-meta-grid-data/crud-meta-grid-data.component";
import { CrudMetaFormDataComponent } from "./crud-meta-data/crud-meta-form-data/crud-meta-form-data.component";
import { CrudClassMetaDataComponent } from "./crud-meta-data/crud-class-meta-data/crud-class-meta-data.component";
import { MetaDataPropertyBindingParameterComponent } from "./crud-meta-data/binding-parameter/binding-parameter.component";
import { DashboardsComponent } from "./dashboard/dashboards/dashboards.components";
import { NgModule } from "@angular/core";
import { DashboardModule } from "./dashboard/dashboard.module";
import { CrudGuard } from "./crud/crud.guard";

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
                data: {
                    similarPath: 'dasboards', // @todo Impement in sidenav
                    showInSubNavigation: true,
                    translationKey: 'Dashboards',
                    icon: 'layers',
                    showInBreadcrumb: false
                },
                children: [
                    {
                        path: '',
                        data: {
                            showInBreadcrumb: false,
                            showInSubNavigation: false,
                            translationKey: 'Dashboards',
                            icon: 'layers',
                            crudClass: 'DashboardBox',
                            crudTypeClass: 'DashboardBoxType',
                            dashboard: 'default'
                        },
                        loadChildren: () => DashboardModule,
                    },
                    {
                        path: 'dashboard',
                        data: {
                            crudClass: 'DashboardBox',
                            crudTypeClass: 'DashboardBoxType'
                        },
                        loadChildren: () => DashboardModule,
                    }
                ]
            },
            {
                path: 'customers',
                component: CustomersComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'Customers',
                    showInSubNavigation: true,
                    icon: 'perm_contact_calendar'
                },
                children: [
                    {
                        path: '',
                        loadChildren: './customers/customers.module#CustomersModule',
                        data: {
                            showInBreadcrumb: false,
                        },
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
                            backend: {
                                crudEntity: 'CrudClassMetaData',
                                repositoryName: 'crud-class-meta-data'
                            },
                            showInBreadcrumb: true,
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                canActivate: [CrudGuard],
                                loadChildren: './crud/crud.module#CrudModule',
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
                            backend: {
                                crudEntity: 'MetaDataPropertyBindingParameter',
                                repositoryName: 'meta-data-property-binding-parameters'
                            }
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                canActivate: [CrudGuard],
                                loadChildren: './crud/crud.module#CrudModule',
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
                            backend: {
                                crudEntity: 'CrudMetaGridData',
                                repositoryName: 'crud-meta-form-data'
                            },
                            showInBreadcrumb: true
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                canActivate: [CrudGuard],
                                loadChildren: './crud/crud.module#CrudModule',
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
                            backend: {
                                crudEntity: 'CrudMetaFormData',
                                repositoryName: 'crud-meta-grid-data'
                            },
                            showInBreadcrumb: true
                        },
                        children: [
                            {
                                path: '',
                                component: CrudComponent,
                                canActivate: [CrudGuard],
                                loadChildren: './crud/crud.module#CrudModule',
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

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
