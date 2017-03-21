import {DashboardBoxDeleteComponent} from "./dashboard-box-delete/dashboard-delete.component";
import {Routes} from "@angular/router";
import {Component} from "./.component";

export const dashboardBoxRoutes: Routes = [
    {
        path: 'delete/:dashboardBoxId',
        component: DashboardBoxDeleteComponent,
    }
];
