import {NgModule} from "@angular/core";
import {CustomersUsersComponent} from "./customers-users.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {UsersRoutingModule} from "./customers-users-routing.module";
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
import {CustomersUsersService} from "./customer-user.service";
import {MessagesModule} from "primeng/components/messages/messages";
import {UsersDeleteModule} from "./users-delete/users-delete.component";
import {UsersCreateModule} from "./users-create/users-create.component";
import {UsersUpdateModule} from "./users-update/users-update.component";

const USERS_CONTACTS_MODULES = [
    UsersRoutingModule,
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
    UsersDeleteModule,
    UsersCreateModule,
    UsersUpdateModule
];

@NgModule({
    imports: [USERS_CONTACTS_MODULES],
    exports: [UsersRoutingModule],
    declarations: [CustomersUsersComponent],
    providers: [
        CustomersUsersService,
        CustomersService,
        HTTP_INTERCEPTOR_PROVIDER
    ],
})
export class UsersModule {
}
