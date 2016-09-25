import { NgModule, ModuleWithProviders } from '@angular/core';
import { Crud } from "./crud.component";
import { CrudView } from "./crudView/crud.view.component";
import { CrudEdit } from "./crudEdit/crud.edit.component";
import { CrudLinkset } from "./crudLinkset/crud.linkset.component";
import { CrudCreate } from "./crudCreate/crud.create.component";
import { CrudDelete } from "./crudDelete/crud.delete.component";
import { CrudService } from "./crud.service";
import { MdModule } from "../md.module";
import { LoadingRouterOutletModule } from "../common/loadingRouterOutlet";
import { TranslateModule, TranslateService } from "ng2-translate";
import { BrowserModule } from "@angular/platform-browser";
import { CubeGridModule } from "../common/spinner/cubeGrid/cubeGrid.component";
import { AlertModule } from "ng2-bootstrap";
import { AgGridModule } from "ag-grid-ng2";
import { GridPaginationModule } from "./directives/gridPagination/gridPagination";
import { LoadingGridModule } from "../common/loadingGrid";
import { FormsModule } from "@angular/forms";
import { MultipleSelect, MultipleSelectModule } from "./directives/multipleSelect/multipleSelect.component";
import { MdSelectModule } from "../common/material/select/select";
import { DynamicForm, DynamicFormModule } from "../dynamicForm/dynamic.form";

const CRUD_DECLARATIONS = [
    Crud,
    CrudView,
    CrudEdit,
    CrudLinkset,
    CrudDelete,
    CrudCreate,
    //DynamicForm,
    //MultipleSelect,
];

const CRUD_MODULES = [
    MdSelectModule,
    GridPaginationModule,
    LoadingRouterOutletModule,
    CubeGridModule,
    AgGridModule,
    LoadingGridModule,
    AlertModule,
    FormsModule,
    MdModule.forRoot(),
    BrowserModule,
    TranslateModule,
    MultipleSelectModule,
    DynamicFormModule
];

@NgModule({
    imports: [CRUD_MODULES],
    exports: [CRUD_DECLARATIONS],
    declarations: [CRUD_DECLARATIONS],
    providers: [CrudService, TranslateService]
})
export class CrudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudModule
        };
    }
}
