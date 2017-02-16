import {NgModule} from "@angular/core";
import {CustomersContactsComponent} from "./customers-contacts.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CustomersContactsRoutingModule} from "./customers-contacts-routing.module";
import {CustomersContactsService} from "./customer-contact.service";
import {CheckboxModule} from "primeng/components/checkbox/checkbox";
import {FormsModule} from "@angular/forms";
import {OneToManyModule} from "../../shared/components/one-to-many/one-to-many.component";
import {TranslateModule} from "ng2-translate";
import {PanelModule} from "primeng/components/panel/panel";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {ButtonModule} from "primeng/components/button/button";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {ControlErrorsModule} from "../../shared/components/control-errors/control-errors";
import {CustomersService} from "../customer.service";
import {HTTP_INTERCEPTOR_PROVIDER} from "../../shared/http-interceptor";
import {MessagesModule} from "primeng/components/messages/messages";
import {ContactsDeleteModule} from "./contacts-delete/contacts-delete.component";
import {ContactsCreateModule} from "./contacts-create/contacts-create.component";
import {ContactsUpdateModule} from "./contacts-update/contacts-update.component";

const CUSTOMERS_CONTACTS_MODULES = [
    CommonModule,
    CheckboxModule,
    FormsModule,
    OneToManyModule,
    TranslateModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ControlErrorsModule,
    RouterModule,
    MessagesModule,
    ContactsDeleteModule,
    ContactsCreateModule,
    ContactsUpdateModule
];

@NgModule({
    imports: [CUSTOMERS_CONTACTS_MODULES],
    exports: [CustomersContactsRoutingModule],
    declarations: [CustomersContactsComponent],
    providers: [
        CustomersContactsService,
        CustomersService,
        HTTP_INTERCEPTOR_PROVIDER
    ],
})
export class CustomersContactsModule {
}
