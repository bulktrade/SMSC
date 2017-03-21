import {DashboardBoxDeleteComponent} from "./dashboard-box-delete/dashboard-delete.component";
import {Routes} from "@angular/router";
import {Component} from "./.component";
import {DashboardBoxCreateComponent} from "./dashboard-box-create/dashboard-box-create.component";
import {DashboardBoxCreateResolve} from "./dashboard-box-create/dashboard-box-create.resolve";

export const dashboardBoxRoutes: Routes = [
    {
        path: 'create',
        component: DashboardBoxCreateComponent,
        resolve: {create: DashboardBoxCreateResolve}
    },
    {
        path: ':dashboardBoxId/delete',
        component: DashboardBoxDeleteComponent
    }
];
