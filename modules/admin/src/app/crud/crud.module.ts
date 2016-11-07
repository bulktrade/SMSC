import { NgModule, ModuleWithProviders } from '@angular/core';
import { CrudComponent } from './crud.component';
import { CrudViewComponent } from './crud-view/crud-view.component';
import { CrudUpdateComponent } from './crud-update/crud-update.component';
import { CrudLinksetModule } from './crud-linkset/crud-linkset.component';
import { CrudCreateComponent } from './crud-create/crud-create.component';
import { CrudDeleteComponent } from './crud-delete/crud-delete.component';
import { CrudService } from './crud.service';
import { LoadingRouterOutletModule } from '../common/loading-router-outlet.component';
import { CubeGridModule } from '../common/spinner/cube-grid/cube-grid.component';
import { AlertModule } from 'ng2-bootstrap';
import { AgGridModule } from 'ag-grid-ng2';
import { GridPaginationModule } from './directives/grid-pagination/grid-pagination.component';
import { LoadingGridModule } from '../common/loading-grid.component';
import { FormsModule } from '@angular/forms';
import { MultipleSelectModule } from './directives/multiple-select/multiple-select.component';
import { MdSelectModule } from '../common/material/select/select.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.component';
import { CrudRoutingModule } from './crud-routing.module';
import { CommonModule } from '@angular/common';
import { DynamicViewModule } from './dynamic-view/dynamic-view.component';
import { TranslateModule } from 'ng2-translate';

const CRUD_DECLARATIONS = [
    CrudComponent,
    CrudViewComponent,
    CrudUpdateComponent,
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
    CommonModule,
    TranslateModule,
    AgGridModule.withNg2ComponentSupport(),
    DynamicFormModule,
    MultipleSelectModule,
    CrudLinksetModule,
    CrudRoutingModule,
    DynamicViewModule
];

@NgModule({
    imports: [
        CRUD_MODULES,
    ],
    exports: [CRUD_DECLARATIONS],
    declarations: [CRUD_DECLARATIONS],
    providers: [CrudService]
})
export class CrudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudModule
        };
    }
}
