"use strict";
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var select_1 = require("../common/material/select/select");
var dashboardService_1 = require("./dashboardService");
var orderby_1 = require("./sorts/orderby");
var dashboard_component_1 = require("./dashboard.component");
var dashboard_view_component_1 = require("./dashboard_view.component");
var dashboard_box_component_1 = require("./dashboard_box.component");
var dashboard_box_update_1 = require("./crud/dashboard_box_update");
var dashboard_box_create_1 = require("./crud/dashboard_box_create");
var ag_grid_ng2_1 = require("ag-grid-ng2");
var ng2_translate_1 = require("ng2-translate");
var platform_browser_1 = require("@angular/platform-browser");
var md_module_1 = require("../md.module");
var gridPagination_1 = require("../crud/directives/gridPagination/gridPagination");
var loadingRouterOutlet_1 = require("../common/loadingRouterOutlet");
var cubeGrid_component_1 = require("../common/spinner/cubeGrid/cubeGrid.component");
var loadingGrid_1 = require("../common/loadingGrid");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var crud_service_1 = require("../crud/crud.service");
var breadcrumb_component_1 = require("../breadcrumb/breadcrumb.component");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var dynamic_form_1 = require("../dynamicForm/dynamic.form");
var dashboards_components_1 = require("./dashboards.components");
var DASHBOARD_DECLARATION = [
    orderby_1.OrderBy,
    dashboard_component_1.Dashboard,
    dashboard_view_component_1.DashboardView,
    dashboard_box_component_1.DashboardBoxComponent,
    dashboard_box_update_1.DashboardCrudUpdate,
    dashboard_box_create_1.DashboardCrudCreate,
    dashboards_components_1.Dashboards
];
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule.forRoot = function () {
        return {
            ngModule: DashboardModule
        };
    };
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                select_1.MdSelectModule,
                gridPagination_1.GridPaginationModule,
                loadingRouterOutlet_1.LoadingRouterOutletModule,
                cubeGrid_component_1.CubeGridModule,
                loadingGrid_1.LoadingGridModule,
                ng2_bootstrap_1.AlertModule,
                forms_1.FormsModule,
                md_module_1.MdModule.forRoot(),
                platform_browser_1.BrowserModule,
                ng2_translate_1.TranslateModule,
                ag_grid_ng2_1.AgGridModule.forRoot(),
                ng2_dragula_1.DragulaModule,
                dynamic_form_1.DynamicFormModule,
                breadcrumb_component_1.BreadcrumbModule
            ],
            exports: [DASHBOARD_DECLARATION],
            declarations: [
                DASHBOARD_DECLARATION
            ],
            providers: [
                crud_service_1.CrudService,
                ng2_translate_1.TranslateService,
                dashboardService_1.DashboardService,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map