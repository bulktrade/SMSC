"use strict";
var core_1 = require('@angular/core');
var crud_component_1 = require('./crud.component');
var crud_view_component_1 = require('./crudView/crud.view.component');
var crud_edit_component_1 = require('./crudEdit/crud.edit.component');
var crud_linkset_component_1 = require('./crudLinkset/crud.linkset.component');
var crud_create_component_1 = require('./crudCreate/crud.create.component');
var crud_delete_component_1 = require('./crudDelete/crud.delete.component');
var crud_service_1 = require('./crud.service');
var md_module_1 = require('../md.module');
var loadingRouterOutlet_1 = require('../common/loadingRouterOutlet');
var ng2_translate_1 = require('ng2-translate');
var platform_browser_1 = require('@angular/platform-browser');
var cubeGrid_component_1 = require('../common/spinner/cubeGrid/cubeGrid.component');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var ag_grid_ng2_1 = require('ag-grid-ng2');
var gridPagination_1 = require('./directives/gridPagination/gridPagination');
var loadingGrid_1 = require('../common/loadingGrid');
var forms_1 = require('@angular/forms');
var multipleSelect_component_1 = require('./directives/multipleSelect/multipleSelect.component');
var select_1 = require('../common/material/select/select');
var dynamic_form_1 = require('../dynamicForm/dynamic.form');
var CRUD_DECLARATIONS = [
    crud_component_1.Crud,
    crud_view_component_1.CrudView,
    crud_edit_component_1.CrudEdit,
    crud_linkset_component_1.CrudLinkset,
    crud_delete_component_1.CrudDelete,
    crud_create_component_1.CrudCreate
];
var CRUD_MODULES = [
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
    dynamic_form_1.DynamicFormModule,
    multipleSelect_component_1.MultipleSelectModule
];
var CrudModule = (function () {
    function CrudModule() {
    }
    CrudModule.forRoot = function () {
        return {
            ngModule: CrudModule
        };
    };
    CrudModule = __decorate([
        core_1.NgModule({
            imports: [
                CRUD_MODULES,
            ],
            exports: [CRUD_DECLARATIONS],
            declarations: [CRUD_DECLARATIONS],
            providers: [crud_service_1.CrudService, ng2_translate_1.TranslateService]
        }), 
        __metadata('design:paramtypes', [])
    ], CrudModule);
    return CrudModule;
}());
exports.CrudModule = CrudModule;
//# sourceMappingURL=crud.module.js.map