import { NgModule, ModuleWithProviders } from "@angular/core";
import { CrudComponent } from "./crud.component";
import { CrudViewComponent } from "./crud-view/crud-view.component";
import { CrudUpdateComponent } from "./crud-update/crud-update.component";
import { CrudCreateComponent } from "./crud-create/crud-create.component";
import { CrudDeleteComponent } from "./crud-delete/crud-delete.component";
import { LoadingRouterOutletModule } from "../common/loading-router-outlet.component";
import { CubeGridModule } from "../common/spinner/cube-grid/cube-grid.component";
import { AlertModule } from "ng2-bootstrap";
import { AgGridModule } from "ag-grid-ng2";
import { LoadingGridModule } from "../common/loading-grid.component";
import { FormsModule } from "@angular/forms";
import { MultipleSelectModule } from "./directives/multiple-select/multiple-select.component";
import { MdSelectModule } from "../common/material/select/select.component";
import { DynamicFormModule } from "./dynamic-form/dynamic-form.component";
import { CrudRoutingModule } from "./crud-routing.module";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { SharedModule } from "primeng/components/common/shared";
import { ButtonModule } from "primeng/components/button/button";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { MessagesModule } from "primeng/components/messages/messages";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { PaginatorModule } from "primeng/components/paginator/paginator";
import { CrudGuard } from "./crud.guard";
import { CrudLinksetModule } from "./crud-linkset/crud-linkset.module";

const CRUD_DECLARATIONS = [
    CrudComponent,
    CrudViewComponent,
    CrudUpdateComponent,
    CrudDeleteComponent,
    CrudCreateComponent
];

const CRUD_MODULES = [
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
    FormsModule,
    CommonModule,
    TranslateModule,
    AgGridModule.withComponents([]),
    DynamicFormModule,
    MultipleSelectModule,
    CrudLinksetModule,
    CrudRoutingModule,
    InputTextModule
];

@NgModule({
    imports: [
        CRUD_MODULES,
    ],
    exports: [CRUD_DECLARATIONS],
    declarations: [CRUD_DECLARATIONS],
    providers: [CrudGuard]
})
export class CrudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudModule
        };
    }
}
