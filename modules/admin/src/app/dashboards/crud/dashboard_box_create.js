"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var crud_service_1 = require("../../crud/crud.service");
var common_1 = require("@angular/common");
var crud_edit_model_1 = require("../../crud/crudEdit/crud.edit.model");
var btn_types_1 = require("../../dynamicForm/btn.types");
var DashboardCrudCreate = (function () {
    function DashboardCrudCreate(router, route, crudService, location) {
        this.router = router;
        this.route = route;
        this.crudService = crudService;
        this.location = location;
        this.resolveData = new crud_edit_model_1.EditModel();
        this.btnName = btn_types_1.BtnTypes.CREATE;
    }
    DashboardCrudCreate.prototype.ngOnInit = function () {
        this.resolveData = this.route.snapshot.data['create'];
        this.crudService.gridOptions.columnDefs = this.resolveData['form'];
    };
    DashboardCrudCreate.prototype.back = function () {
        this.location.back();
    };
    DashboardCrudCreate.prototype.ngOnDestroy = function () {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    };
    DashboardCrudCreate.prototype.onSubmit = function () {
        this.crudService.createRecord(this.crudService.model, this.route.snapshot.params['className']);
    };
    DashboardCrudCreate = __decorate([
        core_1.Component({
            selector: 'dashboard-crud-edit',
            template: '<dynamic-form [crudService]="crudService" [btnName]="btnName"></dynamic-form>'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, crud_service_1.CrudService, common_1.Location])
    ], DashboardCrudCreate);
    return DashboardCrudCreate;
}());
exports.DashboardCrudCreate = DashboardCrudCreate;
//# sourceMappingURL=dashboard_box_create.js.map