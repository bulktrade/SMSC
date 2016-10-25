import {NgModule, ModuleWithProviders} from "@angular/core";
import {DashboardService} from "./dashboardService";
import {OrderBy} from "./sorts/orderby";
import {Dashboard} from "./dashboard.component";
import {DashboardView} from "./dashboardView.component";
import {DashboardBoxComponent} from "./dashboardBox.component";
import {DashboardCrudUpdate} from "./crud/dashboardBoxUpdate";
import {DashboardCrudCreate} from "./crud/dashboardBoxCreate";
import {AgGridModule} from "ag-grid-ng2";
import {TranslateModule, TranslateService} from "ng2-translate";
import {BrowserModule} from "@angular/platform-browser";
import {MdModule} from "../md.module";
import {CubeGridModule} from "../common/spinner/cubeGrid/cubeGrid.component";
import {AlertModule} from "ng2-bootstrap";
import {CrudService} from "../crud/crud.service";
import {BreadcrumbModule} from "../breadcrumb/breadcrumb.component";
import {DragulaModule} from "ng2-dragula/ng2-dragula";
import {Dashboards} from "./dashboards.components";
import {BaThemeConfigProvider} from "./chart/theme/theme.configProvider";
import {LineChart} from "./chart/lineChart.component";
import {BaAmChart} from "./chart/theme/components/baAmChart/baAmChart.component";
import {DynamicFormModule} from "../crud/dynamicForm/dynamicForm.component";
import {LineChartService} from "./chart/lineChart.service";
import {MdSelectModule} from "../common/material/select/select.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingGridModule} from "../common/loadingGrid.component";
import {LoadingRouterOutletModule} from "../common/loadingRouterOutlet.component";
import {GridPaginationModule} from "../crud/directives/gridPagination/gridPagination.component";
import {DashboardCrudDelete} from "./crud/dashboardBoxDelete";
import {DashboardCrudUpdateResolve} from "./crud/dashboardCrudUpdate.resolve";
import {DashboardCrudCreateResolve} from "./crud/dashboardCrudCreate.resolve";
import {DashboardViewResolve} from "./dashboardView.resolve";

const DASHBOARD_DECLARATION = [
    OrderBy,
    Dashboard,
    DashboardView,
    DashboardBoxComponent,
    DashboardCrudUpdate,
    DashboardCrudCreate,
    DashboardCrudDelete,
    Dashboards,
    BaAmChart,
    LineChart
]

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
        BrowserModule,
        TranslateModule,
        AgGridModule.forRoot(),
        DragulaModule,
        DynamicFormModule,
        BreadcrumbModule
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
