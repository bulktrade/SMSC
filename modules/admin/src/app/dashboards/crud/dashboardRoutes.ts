import { DashboardViewComponent } from '../dashboardView.component';
import { DashboardCrudUpdateComponent } from './dashboardBoxUpdate.component';
import { DashboardCrudUpdateResolve } from './dashboardCrudUpdate.resolve';
import { DashboardCrudCreateComponent } from './dashboardBoxCreate.component';
import { DashboardCrudCreateResolve } from './dashboardCrudCreate.resolve';
import { CrudLinksetComponent } from '../../crud/crudLinkset/crudLinkset.component';
import { CrudLinksetResolve } from '../../crud/crudLinkset/crudLinkset.resolve';
import { DashboardComponent } from '../dashboard.component';

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
        path: 'linkset',
        component: CrudLinksetComponent,
        resolve: { linkset: CrudLinksetResolve },
        data: {
            showInBreadcrumb: true,
            translationKey: 'DashboardLinkset'
        }
    }
];

export const DASHBOARD_ROUTES = [
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
    }
];
