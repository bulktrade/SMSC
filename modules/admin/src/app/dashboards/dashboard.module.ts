import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdSelectModule } from '../common/material/select/select.component';
import { DashboardService } from './dashboard.service';
import { OrderBy } from './sorts/orderby';
import { DashboardComponent } from './dashboard.component';
import { DashboardViewComponent } from './dashboardView.component';
import { DashboardBoxComponent } from './dashboardBox.component';
import { DashboardCrudUpdateComponent } from './crud/dashboardBoxUpdate.component';
import { DashboardCrudCreateComponent } from './crud/dashboardBoxCreate.component';
import { AgGridModule } from 'ag-grid-ng2';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { MdModule } from '../md.module';
import { GridPaginationModule } from '../crud/directives/gridPagination/gridPagination.component';
import { LoadingRouterOutletModule } from '../common/loadingRouterOutlet.component';
import { CubeGridModule } from '../common/spinner/cubeGrid/cubeGrid.component';
import { LoadingGridModule } from '../common/loadingGrid.component';
import { AlertModule } from 'ng2-bootstrap';
import { CrudService } from '../crud/crud.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DynamicFormModule } from '../crud/dynamicForm/dynamicForm.component';
import { DashboardsComponent } from './dashboards.components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { CrudLinksetModule } from '../crud/crudLinkset/crudLinkset.component';

const DASHBOARD_DECLARATION = [
    OrderBy,
    DashboardComponent,
    DashboardViewComponent,
    DashboardBoxComponent,
    DashboardCrudUpdateComponent,
    DashboardCrudCreateComponent,
    DashboardsComponent
];

@NgModule({
    imports: [
        MdSelectModule,
        GridPaginationModule,
        LoadingRouterOutletModule,
        CubeGridModule,
        LoadingGridModule,
        AlertModule,
        FormsModule,
        MdModule.forRoot(),
        CommonModule,
        TranslateModule,
        AgGridModule.forRoot(),
        DragulaModule,
        DynamicFormModule,
        BreadcrumbModule,
        CrudLinksetModule,
        DashboardRoutingModule,
    ],
    exports: [DASHBOARD_DECLARATION],
    declarations: [
        DASHBOARD_DECLARATION
    ],
    providers: [
        CrudService,
        TranslateService,
        DashboardService,
        // BreadcrumbComponent
    ]
})
export class DashboardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DashboardModule
        };
    }
}
