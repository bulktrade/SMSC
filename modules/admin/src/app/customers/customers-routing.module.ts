import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CustomersViewResolve } from "./customers-view/customers-view.resolve";
import { CustomersViewComponent } from "./customers-view/customers-view.component";
import { CustomersUpdateComponent } from "./customers-update/customers-update.component";
import { CustomersEditResolve } from "./customers-update/customers-update.resolve";
import { CustomersCreateComponent } from "./customers-create/crud-create.component";
import { CustomersDeleteComponent } from "./customers-delete/customers-delete.component";

const CUSTOMERS_ROUTE_PROVIDER = [
    {
        path: '',
        component: CustomersViewComponent,
        resolve: { view: CustomersViewResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'delete/:id',
        component: CustomersDeleteComponent,
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'update/:id',
        component: CustomersUpdateComponent,
        resolve: { edit: CustomersEditResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'create',
        component: CustomersCreateComponent,
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'contacts',
        loadChildren: './customers-contacts/customers-contacts.module#CustomersContactsModule',
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'users',
        loadChildren: './customers-users/customers-users.module#UsersModule',
        data: {
            showInBreadcrumb: false,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(CUSTOMERS_ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {
}
