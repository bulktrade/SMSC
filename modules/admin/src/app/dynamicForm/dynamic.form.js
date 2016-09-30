"use strict";
var core_1 = require("@angular/core");
var crud_service_1 = require("../crud/crud.service");
var common_1 = require("@angular/common");
var btn_types_1 = require("./btn.types");
var router_1 = require("@angular/router");
var select_1 = require("../common/material/select/select");
var md_module_1 = require("../md.module");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var forms_1 = require("@angular/forms");
var loadingGrid_1 = require("../common/loadingGrid");
var multipleSelect_component_1 = require("../crud/directives/multipleSelect/multipleSelect.component");
var DynamicForm = (function () {
    function DynamicForm(router, route, location) {
        this.router = router;
        this.route = route;
        this.location = location;
    }
    DynamicForm.prototype.onSubmit = function () {
        switch (this.btnName) {
            case btn_types_1.BtnTypes.UPDATE:
                this.crudService.updateRecord(this.crudService.model);
                break;
            case btn_types_1.BtnTypes.CREATE:
                this.crudService.createRecord(this.crudService.model, this.route.snapshot.params['className']);
                break;
        }
    };
    DynamicForm.prototype.ngOnDestroy = function () {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    };
    DynamicForm.prototype.back = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input('btnName'), 
        __metadata('design:type', btn_types_1.BtnTypes)
    ], DynamicForm.prototype, "btnName", void 0);
    __decorate([
        core_1.Input('crudService'), 
        __metadata('design:type', crud_service_1.CrudService)
    ], DynamicForm.prototype, "crudService", void 0);
    DynamicForm = __decorate([
        core_1.Component({
            selector: 'dynamic-form',
            template: require('./form.html'),
            styleUrls: [
                require('./form.scss'),
                require('./style.scss')
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, common_1.Location])
    ], DynamicForm);
    return DynamicForm;
}());
exports.DynamicForm = DynamicForm;
var DynamicFormModule = (function () {
    function DynamicFormModule() {
    }
    DynamicFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ng2_translate_1.TranslateModule,
                loadingGrid_1.LoadingGridModule,
                select_1.MdSelectModule.forRoot(),
                multipleSelect_component_1.MultipleSelectModule.forRoot(),
                md_module_1.MdModule.forRoot(),
                ng2_translate_1.TranslateModule,
                loadingGrid_1.LoadingGridModule
            ],
            exports: [DynamicForm],
            declarations: [DynamicForm]
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicFormModule);
    return DynamicFormModule;
}());
exports.DynamicFormModule = DynamicFormModule;
//# sourceMappingURL=dynamic.form.js.map