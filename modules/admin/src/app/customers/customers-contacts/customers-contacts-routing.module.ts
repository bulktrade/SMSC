import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContactsCreateComponent } from "./contacts-create/contacts-create";
import { ContactsUpdateComponent } from "./contacts-update/contacts-update";
import { ContactsUpdateResolve } from "./contacts-update/contacts-update.resolve";

const CUSTOMERS_CONTACTS_ROUTE_PROVIDER = [
    {
        path: 'create/:customerId',
        component: ContactsCreateComponent,
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'update/:contactId',
        component: ContactsUpdateComponent,
        resolve: { update: ContactsUpdateResolve },
        data: {
            showInBreadcrumb: false,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(CUSTOMERS_CONTACTS_ROUTE_PROVIDER)],
    exports: [RouterModule]
})
export class CustomersContactsRoutingModule {
}
