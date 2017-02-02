import { NgModule } from "@angular/core";
import { CustomersUsersComponent } from "./customers-users";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { UsersRoutingModule } from "./customers-users-routing.module";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { FormsModule } from "@angular/forms";
import { MultipleSelectModule } from "../customers-form/contacts-select/contacts-select.component";
import { TranslateModule } from "ng2-translate";
import { PanelModule } from "primeng/components/panel/panel";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { ButtonModule } from "primeng/components/button/button";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ControlErrorsModule } from "../../common/control-errors/control-errors";
import { CustomersService } from "../customers.service";
import { RequestOptions, XHRBackend, Http } from "@angular/http";
import { HttpInterceptor } from "../../common/http-interceptor";
import { UsersUpdateComponent } from "./users-update/users-update";
import { CustomersUsersService } from "./customers-users.service";
import { UsersCreateComponent } from "./users-create/users-create";

const USERS_CONTACTS_MODULES = [
    UsersRoutingModule,
    CommonModule,
    CheckboxModule,
    FormsModule,
    MultipleSelectModule,
    TranslateModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ControlErrorsModule,
    RouterModule
];

@NgModule({
    imports: [USERS_CONTACTS_MODULES],
    exports: [UsersRoutingModule],
    declarations: [
        CustomersUsersComponent,
        UsersCreateComponent,
        UsersUpdateComponent
    ],
    providers: [
        CustomersUsersService,
        CustomersService,
        {
            provide: Http,
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) =>
                new HttpInterceptor(xhrBackend, requestOptions, router),
            deps: [XHRBackend, RequestOptions, Router]
        }
    ],
})
export class UsersModule {
}
