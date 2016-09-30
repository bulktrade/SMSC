"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var crud_service_1 = require("../../crud/crud.service");
var common_1 = require("@angular/common");
var crud_edit_model_1 = require("../../crud/crudEdit/crud.edit.model");
var btn_types_1 = require("../../dynamicForm/btn.types");
var DashboardCrudUpdate = (function () {
    function DashboardCrudUpdate(router, route, crudService, location) {
        this.router = router;
        this.route = route;
        this.crudService = crudService;
        this.location = location;
        this.resolveData = new crud_edit_model_1.EditModel();
        this.btnName = btn_types_1.BtnTypes.UPDATE;
    }
    DashboardCrudUpdate.prototype.ngOnInit = function () {
        this.resolveData = this.route.snapshot.data['edit'];
        this.crudService.gridOptions.columnDefs = this.resolveData.columnDefs.form;
        if (this.resolveData.inputModel) {
            this.crudService.setModel(this.resolveData.inputModel);
        }
        console.log(this.crudService.gridOptions.columnDefs);
    };
    DashboardCrudUpdate.prototype.onSubmit = function () {
        this.crudService.updateRecord(this.crudService.model);
    };
    DashboardCrudUpdate.prototype.ngOnDestroy = function () {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    };
    DashboardCrudUpdate.prototype.back = function () {
        this.location.back();
    };
    DashboardCrudUpdate = __decorate([
        core_1.Component({
            selector: 'dashboard-crud-edit',
            template: '<dynamic-form [crudService]="crudService" [btnName]="btnName"></dynamic-form>'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, crud_service_1.CrudService, common_1.Location])
    ], DashboardCrudUpdate);
    return DashboardCrudUpdate;
}());
exports.DashboardCrudUpdate = DashboardCrudUpdate;
//# sourceMappingURL=dashboard_box_update.js.map