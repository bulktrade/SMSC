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
import { ButtonModule } from "primeng/components/button/button";
import { SharedModule } from "primeng/components/common/shared";
import { MdSelectModule } from "../common/material/select/select.component";
import { LoadingRouterOutletModule } from "../common/loading-router-outlet.component";
import { CubeGridModule } from "../common/spinner/cube-grid/cube-grid.component";
import { LoadingGridModule } from "../common/loading-grid.component";
import { AlertModule } from "ng2-bootstrap";
import { CustomersService } from "./customers.service";

const CUSTOMERS_DECLARATIONS = [
    CustomersComponent,
    CustomersViewComponent
];

const CUSTOMERS_MODULES = [
    PaginatorModule,
    DataTableModule,
    ButtonModule,
    SharedModule,
    MdSelectModule,
    LoadingRouterOutletModule,
    CubeGridModule,
    LoadingGridModule,
    AlertModule,
    MessagesModule,
    BreadcrumbModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    // DynamicFormModule,
    // MultipleSelectModule,
    CustomersRoutingModule,
    // InputTextModule,
];

@NgModule({
    imports: [CUSTOMERS_MODULES],
    exports: [CUSTOMERS_DECLARATIONS],
    declarations: [CUSTOMERS_DECLARATIONS],
    providers: [CustomersService]
})
export class CustomersModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CustomersModule
        };
    }
}
