import { NgModule } from "@angular/core";
import { CustomersUsersComponent } from "./customers-users";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UsersRoutingModule } from "./customers-users-routing.module";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { FormsModule } from "@angular/forms";
import { OneToManyModule } from "../../common/components/one-to-many/one-to-many.component";
import { TranslateModule } from "ng2-translate";
import { PanelModule } from "primeng/components/panel/panel";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { ButtonModule } from "primeng/components/button/button";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ControlErrorsModule } from "../../common/components/control-errors/control-errors";
import { CustomersService } from "../customers.service";
import { HTTP_INTERCEPTOR_PROVIDER } from "../../common/http-interceptor";
import { UsersUpdateComponent } from "./users-update/users-update";
import { CustomersUsersService } from "./customers-users.service";
import { UsersCreateComponent } from "./users-create/users-create";
import { BreadcrumbModule } from "../../breadcrumb/breadcrumb.component";
import { MessagesModule } from "primeng/components/messages/messages";
import { UsersDeleteComponent } from "./contacts-delete/users-delete.component";

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
    BreadcrumbModule,
    MessagesModule
];

@NgModule({
    imports: [USERS_CONTACTS_MODULES],
    exports: [UsersRoutingModule],
    declarations: [
        CustomersUsersComponent,
        UsersCreateComponent,
        UsersUpdateComponent,
        UsersDeleteComponent
    ],
    providers: [
        CustomersUsersService,
        CustomersService,
        HTTP_INTERCEPTOR_PROVIDER
    ],
})
export class UsersModule {
}
