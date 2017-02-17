import {NgModule, ModuleWithProviders} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "ng2-translate";
import {CustomersComponent} from "./customers.components";
import {CustomersRoutingModule} from "./customers-routing.module";
import {MessagesModule} from "primeng/components/messages/messages";
import {ButtonModule} from "primeng/components/button/button";
import {SharedModule} from "primeng/components/common/shared";
import {LoadingRouterOutletModule} from "../shared/components/loading-router-outlet/loading-router-outlet.component";
import {CubeGridModule} from "../shared/components/cube-grid/cube-grid.component";
import {LoadingGridModule} from "../shared/components/loading-grid/loading-grid.component";
import {CustomersService} from "./customer.service";
import {CustomersFormModule} from "./customers-form/customers-form.component";
import {InputTextModule} from "primeng/components/inputtext/inputtext";
import {CustomersUpdateComponent} from "./customers-update/customers-update.component";
import {CustomersCreateComponent} from "./customers-create/crud-create.component";
import {HTTP_INTERCEPTOR_PROVIDER} from "../shared/http-interceptor";
import {CustomersDeleteComponent} from "./customers-delete/customers-delete.component";
import {CustomersContactsService} from "./customers-contacts/customer-contact.service";
import {CustomersUsersService} from "./customers-users/customer-user.service";
import {OneToManyModule} from "../shared/components/one-to-many/one-to-many.component";
import {OneToOneModule} from "../shared/components/one-to-one/one-to-one.component";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {ParentCustomerModule} from "./parent-customer/parent-customer";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {DialogModule} from "primeng/components/dialog/dialog";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {RouterModule} from "@angular/router";
import {CustomersViewComponent} from "./customers-view/customers-view.component";
import {ContactsDeleteModule} from "./customers-contacts/contacts-delete/contacts-delete.component";
import {ContactsCreateModule} from "./customers-contacts/contacts-create/contacts-create.component";
import {ContactsUpdateModule} from "./customers-contacts/contacts-update/contacts-update.component";
import {UsersCreateModule} from "./customers-users/users-create/users-create.component";
import {UsersUpdateModule} from "./customers-users/users-update/users-update.component";

const CUSTOMERS_DECLARATIONS = [
    CustomersComponent,
    CustomersUpdateComponent,
    CustomersCreateComponent,
    CustomersDeleteComponent,
    CustomersViewComponent
];

const CUSTOMERS_PROVIDERS = [
    CustomersService,
    CustomersContactsService,
    CustomersUsersService,
    HTTP_INTERCEPTOR_PROVIDER
];

const CUSTOMERS_MODULES = [
    ContactsCreateModule,
    ContactsDeleteModule,
    ContactsUpdateModule,
    UsersCreateModule,
    UsersUpdateModule,
    TabViewModule,
    DialogModule,
    PaginatorModule,
    DataTableModule,
    RouterModule,
    ParentCustomerModule,
    DropdownModule,
    OneToManyModule,
    OneToOneModule,
    ButtonModule,
    SharedModule,
    LoadingRouterOutletModule,
    CubeGridModule,
    LoadingGridModule,
    MessagesModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    CustomersFormModule,
    CustomersRoutingModule,
    InputTextModule
];

@NgModule({
    imports: [CUSTOMERS_MODULES],
    exports: [CUSTOMERS_DECLARATIONS],
    declarations: [CUSTOMERS_DECLARATIONS],
    providers: [CUSTOMERS_PROVIDERS]
})
export class CustomersModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CustomersModule
        };
    }
}
