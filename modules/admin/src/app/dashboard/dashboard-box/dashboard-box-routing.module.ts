import {DashboardBoxDeleteComponent} from "./dashboard-box-delete/dashboard-delete.component";
import {DashboardBoxUpdateComponent} from "./dashboard-box-update/dashboard-box-update.component";
import {DashboardBoxUpdateResolve} from "./dashboard-box-update/dashboard-box-update.resolve";
import {Routes} from "@angular/router";
import {Component} from "./.component";

export const dashboardBoxRoutes: Routes = [
    {
        path: 'delete/:dashboardBoxId',
        component: DashboardBoxDeleteComponent,
    },
    {
        path: 'update/:dashboardBoxId',
        component: DashboardBoxUpdateComponent,
        resolve: {update: DashboardBoxUpdateResolve}
    }
];
