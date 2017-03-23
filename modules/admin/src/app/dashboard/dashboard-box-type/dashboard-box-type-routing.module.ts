import {DashboardBoxDeleteComponent} from "./dashboard-box-delete/dashboard-delete.component";
import {Routes} from "@angular/router";
import {DashboardBoxTypeCreateComponent} from "./dashboard-box-type-create/dashboard-box-type-create.component";
import {DashboardBoxTypeUpdateComponent} from "./dashboard-box-type-update/dashboard-box-type-update";
import {DashboardBoxTypeUpdateResolve} from "./dashboard-box-type-update/dashboard-box-type-update.resolve";
import {DashboardBoxTypeDeleteComponent} from "./dashboard-box-type-delete/dashboard-delete.component";

export const dashboardBoxTypeRoutes: Routes = [
    {
        path: 'create',
        component: DashboardBoxTypeCreateComponent
    },
    {
        path: ':id/update',
        component: DashboardBoxTypeUpdateComponent,
        resolve: {update: DashboardBoxTypeUpdateResolve}
    },
    {
        path: ':id/delete',
        component: DashboardBoxTypeDeleteComponent,
    }
];
