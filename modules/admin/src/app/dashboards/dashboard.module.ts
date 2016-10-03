import {NgModule, ModuleWithProviders} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MdSelectModule} from "../common/material/select/select";
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
import {GridPaginationModule} from "../crud/directives/gridPagination/gridPagination";
import {LoadingRouterOutletModule} from "../common/loadingRouterOutlet";
import {CubeGridModule} from "../common/spinner/cubeGrid/cubeGrid.component";
import {LoadingGridModule} from "../common/loadingGrid";
import {AlertModule} from "ng2-bootstrap";
import {CrudService} from "../crud/crud.service";
import {BreadcrumbModule} from "../breadcrumb/breadcrumb.component";
import {DragulaModule} from "ng2-dragula/ng2-dragula";
import {DynamicFormModule} from "../dynamicForm/dynamic.form";
import {Dashboards} from "./dashboards.components";

const DASHBOARD_DECLARATION = [
    OrderBy,
    Dashboard,
    DashboardView,
    DashboardBoxComponent,
    DashboardCrudUpdate,
    DashboardCrudCreate,
    Dashboards
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
        //Breadcrumb
    ]
})
export class DashboardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DashboardModule
        };
    }
}
