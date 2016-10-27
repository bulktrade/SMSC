import { DashboardViewComponent } from '../dashboardView.component';
import { DashboardCrudUpdateComponent } from './dashboardBoxUpdate.component';
import { DashboardCrudUpdateResolve } from './dashboardCrudUpdate.resolve';
import { DashboardCrudCreateComponent } from './dashboardBoxCreate.component';
import { DashboardCrudCreateResolve } from './dashboardCrudCreate.resolve';
import { CrudLinksetComponent } from '../../crud/crudLinkset/crudLinkset.component';
import { CrudLinksetResolve } from '../../crud/crudLinkset/crudLinkset.resolve';

export const DASHBOARD_CRUD_ROUTE_PROVIDER = [
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
            showInBreadcrumb: false,
            translationKey: 'DashboardUpdate'
        }
    },
    {
        path: 'create/:className',
        component: DashboardCrudCreateComponent,
        resolve: { create: DashboardCrudCreateResolve },
        data: {
            showInBreadcrumb: false,
            translationKey: 'DashboardCreate'
        }
    },
    {
        path: 'linkset',
        component: CrudLinksetComponent,
        resolve: { linkset: CrudLinksetResolve },
        data: {
            showInBreadcrumb: false,
            translationKey: 'DashboardLinkset'
        }
    }
];
