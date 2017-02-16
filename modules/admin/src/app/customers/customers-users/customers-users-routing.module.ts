import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UsersUpdateResolve} from "./users-update/users-update.resolve";
import {UsersCreateComponent} from "./users-create/users-create.component";
import {UsersUpdateComponent} from "./users-update/users-update";
import {UsersDeleteComponent} from "./contacts-delete/users-delete.component";

const CUSTOMERS_CONTACTS_ROUTE_PROVIDER = [
    {
        path: 'create/:customerId',
        component: UsersCreateComponent,
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'update/:userId',
        component: UsersUpdateComponent,
        resolve: {update: UsersUpdateResolve},
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'delete/:userId',
        component: UsersDeleteComponent,
        data: {
            showInBreadcrumb: false,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(CUSTOMERS_CONTACTS_ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
