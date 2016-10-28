import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdSelectModule } from '../common/material/select/select.component';
import { DashboardService } from './dashboard.service';
import { OrderBy } from './sorts/orderby';
import { DashboardComponent } from './dashboard.component';
import { DashboardViewComponent } from './dashboard-view.component';
import { DashboardBoxComponent } from './dashboard-box.component';
import { DashboardCrudUpdateComponent } from './crud/dashboard-box-update.component';
import { DashboardCrudCreateComponent } from './crud/dashboard-box-create.component';
import { AgGridModule } from 'ag-grid-ng2';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { MdModule } from '../md.module';
import { GridPaginationModule } from '../crud/directives/gridPagination/grid-pagination.component';
import { LoadingRouterOutletModule } from '../common/loading-router-outlet.component';
import { CubeGridModule } from '../common/spinner/cube-grid/cube-grid.component';
import { LoadingGridModule } from '../common/loading-grid.component';
import { AlertModule } from 'ng2-bootstrap';
import { CrudService } from '../crud/crud.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DynamicFormModule } from '../crud/dynamic-form/dynamic-form.component';
import { DashboardsComponent } from './dashboards.components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { CrudLinksetModule } from '../crud/crud-linkset/crud-linkset.component';

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
