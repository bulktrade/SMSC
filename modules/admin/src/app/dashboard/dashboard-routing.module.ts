import {NgModule} from "@angular/core";
import {RouterModule, Route} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {DashboardResolve} from "./dashboard.resolve";
import {DashboardCreateComponent} from "./dashboard-create/dashboard-create.component";
import {DashboardUpdateComponent} from "./dashboard-update/dashboard-update.component";
import {DashboardUpdateResolve} from "./dashboard-update/dashboard-update.resolve";
import {DashboardDeleteComponent} from "./dashboard-delete/dashboard-delete.component";
import {DashboardsComponent} from "./dashboards/dashboards.component";
import {DashboardsResolve} from "./dashboards/dashboards.resolve";
import {dashboardBoxRoutes} from "./dashboard-box/dashboard-box-routing.module";
import {dashboardBoxTypeRoutes} from "./dashboard-box-type/dashboard-box-type-routing.module";

const ROUTE_PROVIDER: Route[] = [
    {
        path: 'create',
        component: DashboardCreateComponent
    },
    {
        path: ':id/update',
        component: DashboardUpdateComponent,
        resolve: {update: DashboardUpdateResolve}
    },
    {
        path: ':id/delete',
        component: DashboardDeleteComponent,
    },
    {
        path: ':id/delete',
        component: DashboardDeleteComponent,
    },
    {
        path: ':id/dashboard-box',
        children: dashboardBoxRoutes
    },
    {
        path: 'dashboard-box-type',
        children: dashboardBoxTypeRoutes
    },
    {
        path: ':id',
        component: DashboardComponent,
        resolve: {dashboard: DashboardResolve}
    },
    {
        path: '',
        component: DashboardsComponent,
        resolve: {dashboards: DashboardsResolve}
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
