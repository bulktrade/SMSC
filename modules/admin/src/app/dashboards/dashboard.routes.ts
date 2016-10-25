import {CrudLinksetResolve} from "../crud/crudLinkset/crudLinkset.resolve";
import {DashboardCrudCreateResolve} from "./crud/dashboardCrudCreate.resolve";
import {DashboardCrudCreate} from "./crud/dashboardBoxCreate";
import {DashboardCrudUpdateResolve} from "./crud/dashboardCrudUpdate.resolve";
import {DashboardCrudUpdate} from "./crud/dashboardBoxUpdate";
import {DashboardView} from "./dashboardView.component";
import {DashboardCrudDelete} from "./crud/dashboardBoxDelete";
import {CrudLinkset} from "../crud/crudLinkset/crudLinkset.component";
import {Dashboard} from "./dashboard.component";
import {DashboardViewResolve} from "./dashboardView.resolve";

export const DASHBOARD_ROUTER_PROVIDER = [
    {
        path: '',
        component: Dashboard,
        data: {
            showInSubNavigation: false,
            icon: 'layers',
            crudClass: 'DashboardBox',
            crudTypeClass: 'DashboardBoxType',
            dashboard: 'default'
        },
        children: [
            {
                path: '',
                component: DashboardView,
                resolve: {
                    data: DashboardViewResolve
                }
            },
            {
                path: 'edit/:id',
                component: DashboardCrudUpdate,
                resolve: { edit: DashboardCrudUpdateResolve }
            },
            {
                path: 'create/:className/:dashboard',
                component: DashboardCrudCreate,
                resolve: { create: DashboardCrudCreateResolve }
            },
            {
                path: 'create/:className',
                component: DashboardCrudCreate,
                resolve: { create: DashboardCrudCreateResolve }
            },
            {
                path: 'delete/:id',
                component: DashboardCrudDelete
            },
            { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } }
        ]
    },
    {
        path: 'dashboard',
        component: Dashboard,
        data: {
            crudClass: 'DashboardBox',
            crudTypeClass: 'DashboardBoxType'
        },
        children: [
            {
                path: '',
                component: DashboardView,
                resolve: {
                    data: DashboardViewResolve
                }
            },
            {
                path: 'edit/:id',
                component: DashboardCrudUpdate,
                resolve: { edit: DashboardCrudUpdateResolve } },
            {
                path: 'create/:className/:dashboard',
                component: DashboardCrudCreate,
                resolve: { create: DashboardCrudCreateResolve }
            },
            {
                path: 'create/:className',
                component: DashboardCrudCreate,
                resolve: { create: DashboardCrudCreateResolve }
            },
            {
                path: 'delete/:id',
                component: DashboardCrudDelete
            },
            { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } }
        ]
    }
];
