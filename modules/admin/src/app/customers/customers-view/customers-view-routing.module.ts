import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CustomersViewComponent} from "./customers-view.component";
import {CustomersViewResolve} from "./customers-view.resolve";

const ROUTE_PROVIDER = [
    {
        path: '',
        component: CustomersViewComponent,
        resolve: {view: CustomersViewResolve},
        children: [
            {
                path: 'users',
                loadChildren: './../customers-users/customers-users.module#UsersModule',
                data: {showInBreadcrumb: false}
            }
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class CustomersViewRoutingModule {
}
