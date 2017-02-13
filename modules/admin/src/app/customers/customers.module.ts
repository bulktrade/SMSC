import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { CustomersViewComponent } from "./customers-view/customers-view.component";
import { CustomersComponent } from "./customers.components";
import { CustomersRoutingModule } from "./customers-routing.module";
import { BreadcrumbModule } from "../breadcrumb/breadcrumb.component";
import { MessagesModule } from "primeng/components/messages/messages";
import { PaginatorModule } from "primeng/components/paginator/paginator";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { DialogModule } from "primeng/components/dialog/dialog";
import { ButtonModule } from "primeng/components/button/button";
import { SharedModule } from "primeng/components/common/shared";
import { LoadingRouterOutletModule } from "../shared/components/loading-router-outlet/loading-router-outlet.component";
import { CubeGridModule } from "../shared/components/cube-grid/cube-grid.component";
import { LoadingGridModule } from "../shared/components/loading-grid/loading-grid.component";
import { CustomersService } from "./customers.service";
import { DynamicFormModule } from "./customers-form/customers-form.component";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { CustomersUpdateComponent } from "./customers-update/customers-update.component";
import { CustomersCreateComponent } from "./customers-create/crud-create.component";
import { HTTP_INTERCEPTOR_PROVIDER } from "../shared/http-interceptor";
import { CustomersDeleteComponent } from "./customers-delete/customers-delete.component";
import { CustomersContactsService } from "./customers-contacts/customers-contacts.service";
import { CustomersUsersService } from "./customers-users/customers-users.service";
import { OneToManyModule } from "../shared/components/one-to-many/one-to-many.component";
import { OneToOneModule } from "../shared/components/one-to-one/one-to-one.component";
import { DropdownModule } from "primeng/components/dropdown/dropdown";

const CUSTOMERS_DECLARATIONS = [
    CustomersComponent,
    CustomersViewComponent,
    CustomersUpdateComponent,
    CustomersCreateComponent,
    CustomersDeleteComponent
];

const CUSTOMERS_PROVIDERS = [
    CustomersService,
    CustomersContactsService,
    CustomersUsersService,
    HTTP_INTERCEPTOR_PROVIDER
];

const CUSTOMERS_MODULES = [
    DropdownModule,
    OneToManyModule,
    OneToOneModule,
    DialogModule,
    PaginatorModule,
    DataTableModule,
    ButtonModule,
    SharedModule,
    LoadingRouterOutletModule,
    CubeGridModule,
    LoadingGridModule,
    MessagesModule,
    BreadcrumbModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    DynamicFormModule,
    CustomersRoutingModule,
    InputTextModule,
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
