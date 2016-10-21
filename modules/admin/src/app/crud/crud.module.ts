import { NgModule, ModuleWithProviders } from '@angular/core';
import { CrudComponent } from './crud.component';
import { CrudViewComponent } from './crudView/crudView.component';
import { CrudUpdateComponent } from './crudUpdate/crudUpdate.component';
import { CrudLinksetComponent } from './crudLinkset/crudLinkset.component';
import { CrudCreateComponent } from './crudCreate/crudCreate.component';
import { CrudDeleteComponent } from './crudDelete/crudDelete.component';
import { CrudService } from './crud.service';
import { MdModule } from '../md.module';
import { LoadingRouterOutletModule } from '../common/loadingRouterOutlet.component';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { BrowserModule } from '@angular/platform-browser';
import { CubeGridModule } from '../common/spinner/cubeGrid/cubeGrid.component';
import { AlertModule } from 'ng2-bootstrap';
import { AgGridModule } from 'ag-grid-ng2';
import { GridPaginationModule } from './directives/gridPagination/gridPagination.component';
import { LoadingGridModule } from '../common/loadingGrid.component';
import { FormsModule } from '@angular/forms';
import { MultipleSelectModule } from './directives/multipleSelect/multipleSelect.component';
import { MdSelectModule } from '../common/material/select/select.component';
import { DynamicFormModule } from './dynamicForm/dynamicForm.component';

const CRUD_DECLARATIONS = [
    CrudComponent,
    CrudViewComponent,
    CrudUpdateComponent,
    CrudLinksetComponent,
    CrudDeleteComponent,
    CrudCreateComponent
];

const CRUD_MODULES = [
    MdSelectModule,
    GridPaginationModule,
    LoadingRouterOutletModule,
    CubeGridModule,
    LoadingGridModule,
    AlertModule,
    FormsModule,
    MdModule.forRoot(),
    BrowserModule,
    TranslateModule,
    AgGridModule.forRoot(),
    DynamicFormModule,
    MultipleSelectModule
];

@NgModule({
    imports: [
        CRUD_MODULES,
    ],
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
