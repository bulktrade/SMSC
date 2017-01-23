import { NgModule, ModuleWithProviders } from "@angular/core";
import { PaginatorModule } from "primeng/components/paginator/paginator";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { ButtonModule } from "primeng/components/button/button";
import { CommonModule } from "@angular/common";
import { MdSelectModule } from "../../common/material/select/select.component";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { TranslateModule } from "ng2-translate";
import { AlertModule } from "ng2-bootstrap";
import { AgGridModule } from "ag-grid-ng2";
import { LoadingGridModule } from "../../common/loading-grid.component";
import { CrudLinksetComponent } from "./crud-linkset.component";
import { CrudViewService } from "../crud-view/crud-view.service";

@NgModule({
    imports: [
        PaginatorModule,
        DataTableModule,
        ButtonModule,
        CommonModule,
        MdSelectModule,
        FormsModule,
        DropdownModule,
        TranslateModule,
        AlertModule,
        AgGridModule,
        LoadingGridModule
    ],
    exports: [CrudLinksetComponent],
    declarations: [CrudLinksetComponent],
    providers: [CrudViewService]
})
export class CrudLinksetModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudLinksetModule,
            providers: []
        };
    }
}
