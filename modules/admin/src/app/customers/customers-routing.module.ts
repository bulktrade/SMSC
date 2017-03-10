import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CustomersDeleteComponent} from "./customers-delete/customers-delete.component";
import {CustomersUpdateComponent} from "./customers-update/customers-update.component";
import {CustomersEditResolve} from "./customers-update/customers-update.resolve";
import {CustomersCreateComponent} from "./customers-create/customers-create.component";
import {CustomersViewComponent} from "./customers-view/customers-view.component";
import {CustomersViewResolve} from "./customers-view/customers-view.resolve";

export const CUSTOMERS_ROUTE_PROVIDER = [
    {
        path: '',
        component: CustomersViewComponent,
        resolve: {view: CustomersViewResolve},
    },
    {
        path: ':customerId/delete',
        component: CustomersDeleteComponent,
    },
    {
        path: ':customerId/update',
        component: CustomersUpdateComponent,
        resolve: {edit: CustomersEditResolve},
    },
    {
        path: 'create',
        component: CustomersCreateComponent,
    },
    {
        path: ':customerId/contacts',
        loadChildren: './customers-contacts/customers-contacts.module#CustomersContactsModule',
    },
    {
        path: ':customerId/users',
        loadChildren: './customers-users/customers-users.module#UsersModule',
    }
];

@NgModule({
    imports: [RouterModule.forChild(CUSTOMERS_ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {
}
