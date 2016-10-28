import { DashboardViewComponent } from './dashboardView.component';
import { DashboardCrudUpdateComponent } from './crud/dashboardBoxUpdate.component';
import { DashboardCrudUpdateResolve } from './crud/dashboardCrudUpdate.resolve';
import { DashboardCrudCreateComponent } from './crud/dashboardBoxCreate.component';
import { DashboardCrudCreateResolve } from './crud/dashboardCrudCreate.resolve';
import { CrudLinksetComponent } from '../crud/crudLinkset/crudLinkset.component';
import { CrudLinksetResolve } from '../crud/crudLinkset/crudLinkset.resolve';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const DASHBOARD_CRUD_ROUTES = [
    {
        path: '',
        component: DashboardViewComponent,
        data: {
            showInBreadcrumb: true,
            translationKey: 'DashboardView'
        }
    },
    {
        path: 'edit/:id',
        component: DashboardCrudUpdateComponent,
        resolve: { edit: DashboardCrudUpdateResolve },
        data: {
            showInBreadcrumb: true,
            translationKey: 'DashboardUpdate'
        }
    },
    {
        path: 'create/:className',
        component: DashboardCrudCreateComponent,
        resolve: { create: DashboardCrudCreateResolve },
        data: {
            showInBreadcrumb: true,
            translationKey: 'DashboardCreate'
        }
    },
    {
        path: 'linkset/:className',
        component: CrudLinksetComponent,
        resolve: { linkset: CrudLinksetResolve },
        data: {
            showInBreadcrumb: true,
            translationKey: 'DashboardLinkset'
        }
    }
];

const DASHBOARD_ROUTES = [
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
        children: DASHBOARD_CRUD_ROUTES
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            crudClass: 'DashboardBox'
        },
        children: DASHBOARD_CRUD_ROUTES
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(DASHBOARD_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}
