"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var crud_service_1 = require('../crud.service');
var common_1 = require('@angular/common');
var btn_types_1 = require('../../dynamicForm/btn.types');
var CrudEdit = (function () {
    function CrudEdit(translate, crudService, router, route, location) {
        this.translate = translate;
        this.crudService = crudService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.btnName = btn_types_1.BtnTypes.UPDATE;
    }
    CrudEdit.prototype.ngOnInit = function () {
        this.resolveData = this.route.snapshot.data['edit'];
        if (this.resolveData.inputModel) {
            this.crudService.setModel(this.resolveData.inputModel);
        }
        this.crudService.gridOptions.columnDefs = this.resolveData.columnDefs.form;
    };
    CrudEdit.prototype.ngOnDestroy = function () {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    };
    CrudEdit.prototype.onSubmit = function () {
        this.crudService.updateRecord(this.crudService.model);
    };
    CrudEdit = __decorate([
        core_1.Component({
            selector: 'crud-edit',
            template: '<dynamic-form [btnName]="btnName"></dynamic-form>',
            styleUrls: [
                require('../common/style.scss')
            ],
            providers: [common_1.Location]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, crud_service_1.CrudService, router_1.Router, router_1.ActivatedRoute, common_1.Location])
    ], CrudEdit);
    return CrudEdit;
}());
exports.CrudEdit = CrudEdit;
//# sourceMappingURL=crud.edit.component.js.map