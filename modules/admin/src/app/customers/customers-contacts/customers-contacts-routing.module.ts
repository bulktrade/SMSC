import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContactsCreateComponent } from "./contacts-create/contacts-create";

const CUSTOMERS_CONTACTS_ROUTE_PROVIDER = [
    {
        path: 'create/:customerId',
        component: ContactsCreateComponent,
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
