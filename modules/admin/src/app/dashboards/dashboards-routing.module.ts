import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DashboardsComponent} from "./dashboards.component";
import {DashboardsResolve} from "./dashboards.resolve";
import {DashboardCreateComponent} from "./dashboard-create/dashboard-create.component";

const ROUTE_PROVIDER = [
    {
        path: 'create',
        component: DashboardCreateComponent
    },
    {
        path: '',
        component: DashboardsComponent,
        resolve: {
            dashboards: DashboardsResolve
        }
    },
    {
        path: ':id',
        component: DashboardsComponent,
        resolve: {
            dashboards: DashboardsResolve
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {
}
