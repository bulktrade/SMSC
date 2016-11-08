import { NgModule, ModuleWithProviders } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { OrderBy } from './pipe/orderby';
import { DashboardComponent } from './dashboard.component';
import { DashboardBoxComponent } from './dashboard-box/dashboard-box.component';
import {
    DashboardCrudUpdateComponent
} from './crud/dashbaord-box-update/dashboard-box-update.component';
import {
    DashboardCrudCreateComponent
} from './crud/dashboard-box-create/dashboard-box-create.component';
import { AgGridModule } from 'ag-grid-ng2';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { MdModule } from '../md.module';
import { CubeGridModule } from '../common/spinner/cube-grid/cube-grid.component';
import { AlertModule } from 'ng2-bootstrap';
import { CrudService } from '../crud/crud.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DashboardsComponent } from './dashboards/dashboards.components';
import { BaThemeConfigProvider } from './chart/theme/theme.configProvider';
import { LineChart } from './chart/lineChart.component';
import { BaAmChart } from './chart/theme/components/baAmChart/baAmChart.component';
import { DynamicFormModule } from '../crud/dynamic-form/dynamic-form.component';
import { LineChartService } from './chart/lineChart.service';
import { MdSelectModule } from '../common/material/select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingGridModule } from '../common/loading-grid.component';
import { LoadingRouterOutletModule } from '../common/loading-router-outlet.component';
import { GridPaginationModule } from '../crud/directives/grid-pagination/grid-pagination.component';
import { DashboardCrudDeleteComponent } from './crud/dashboard-box-delete/dashboard-box-delete.component';
import { DashboardCrudUpdateResolve } from './crud/dashboard-crud-update.resolve';
import { DashboardCrudCreateResolve } from './crud/dashboard-crud-create.resolve';
import { DashboardViewResolve } from './dashboard-view/dashboard-view.resolve';
import { CommonModule } from '@angular/common';
import { CrudLinksetModule } from '../crud/crud-linkset/crud-linkset.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

const DASHBOARD_DECLARATION = [
    OrderBy,
    DashboardComponent,
    DashboardViewComponent,
    DashboardBoxComponent,
    DashboardCrudUpdateComponent,
    DashboardCrudCreateComponent,
    DashboardCrudDeleteComponent,
    DashboardsComponent,
    BaAmChart,
    LineChart
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
        ReactiveFormsModule,
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
        BaThemeConfigProvider,
        LineChartService,
        DashboardCrudUpdateResolve,
        DashboardCrudCreateResolve,
        DashboardViewResolve
    ]
})
export class DashboardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DashboardModule
        };
    }
}
