import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UsersUpdateResolve} from "./users-update/users-update.resolve";
import {UsersCreateComponent} from "./users-create/users-create.component";
import {UsersUpdateComponent} from "./users-update/users-update.component";
import {UsersDeleteComponent} from "./users-delete/users-delete.component";

const CUSTOMERS_CONTACTS_ROUTE_PROVIDER = [
    {
        path: 'create',
        component: UsersCreateComponent
    },
    {
        path: 'update/:userId',
        component: UsersUpdateComponent,
        resolve: {update: UsersUpdateResolve}
    },
    {
        path: 'delete/:userId',
        component: UsersDeleteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(CUSTOMERS_CONTACTS_ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
