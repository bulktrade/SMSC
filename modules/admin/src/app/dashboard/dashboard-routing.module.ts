import {DashboardCrudUpdateComponent} from "./crud/dashbaord-box-update/dashboard-box-update.component";
import {DashboardCrudUpdateResolve} from "./crud/dashboard-crud-update.resolve";
import {DashboardCrudCreateResolve} from "./crud/dashboard-crud-create.resolve";
// import { CrudLinksetComponent } from '../crud/crud-linkset/crud-linkset.component';
// import { CrudLinksetResolve } from '../crud/crud-linkset/crud-linkset.resolve';
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DashboardViewResolve} from "./dashboard-view/dashboard-view.resolve";
import {DashboardCrudDeleteComponent} from "./crud/dashboard-box-delete/dashboard-box-delete.component";
import {DashboardViewComponent} from "./dashboard-view/dashboard-view.component";
import {DashboardCrudCreateComponent} from "./crud/dashboard-box-create/dashboard-box-create.component";

const DASHBOARD_CRUD_ROUTES = [
    {
        path: '',
        component: DashboardViewComponent,
        resolve: {
            data: DashboardViewResolve
        },
        data: {
            translationKey: 'DashboardView'
        }
    },
    {
        path: 'edit/:id',
        component: DashboardCrudUpdateComponent,
        resolve: {edit: DashboardCrudUpdateResolve},
        data: {
            translationKey: 'DashboardUpdate'
        }
    },
    {
        path: 'create/:className',
        component: DashboardCrudCreateComponent,
        resolve: {create: DashboardCrudCreateResolve},
        data: {
            translationKey: 'DashboardCreate'
        }
    },
    {
        path: 'create/:className/:dashboard',
        component: DashboardCrudCreateComponent,
        resolve: {create: DashboardCrudCreateResolve},
        data: {
            translationKey: 'DashboardCreate'
        }
    },
    {
        path: 'delete/:id',
        component: DashboardCrudDeleteComponent,
        data: {
            translationKey: 'DashboardDelete'
        }
    },
    // {
    //     path: 'linkset/:className',
    //     component: CrudLinksetComponent,
    //     resolve: { linkset: CrudLinksetResolve },
    //     data: {
    //         translationKey: 'DashboardLinkset'
    //     }
    // }
];

@NgModule({
    imports: [
        RouterModule.forChild(DASHBOARD_CRUD_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {
}
