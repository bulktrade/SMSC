import {NgModule} from "@angular/core";
import {CustomersViewComponent} from "./customers-view.component";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {OneToManyModule} from "../../shared/components/one-to-many/one-to-many.component";
import {OneToOneModule} from "../../shared/components/one-to-one/one-to-one.component";
import {DialogModule} from "primeng/components/dialog/dialog";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {ButtonModule} from "primeng/components/button/button";
import {SharedModule} from "primeng/components/common/shared";
import {CommonModule} from "@angular/common";
import {ParentCustomerModule} from "../parent-customer/parent-customer";
import {TranslateModule} from "ng2-translate";
import {CustomersViewRoutingModule} from "./customers-view-routing.module";
import {HTTP_INTERCEPTOR_PROVIDER} from "../../shared/http-interceptor";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        TabViewModule,
        DropdownModule,
        OneToManyModule,
        OneToOneModule,
        DialogModule,
        PaginatorModule,
        DataTableModule,
        ButtonModule,
        SharedModule,
        RouterModule,
        TranslateModule,
        ParentCustomerModule,
        CustomersViewRoutingModule
    ],
    exports: [CustomersViewComponent],
    declarations: [CustomersViewComponent],
    providers: [HTTP_INTERCEPTOR_PROVIDER]
})
export class CustomersViewModule {
}
