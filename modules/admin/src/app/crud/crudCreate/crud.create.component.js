"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var router_1 = require('@angular/router');
var crud_service_1 = require('../crud.service');
var common_1 = require('@angular/common');
var btn_types_1 = require('../../dynamicForm/btn.types');
var CrudCreate = (function () {
    function CrudCreate(translate, crudService, router, route, location) {
        this.translate = translate;
        this.crudService = crudService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.resolveData = null;
        this.btnName = btn_types_1.BtnTypes.CREATE;
    }
    CrudCreate.prototype.ngOnInit = function () {
        this.resolveData = this.route.snapshot.data['create'];
        this.crudService.gridOptions.columnDefs = this.resolveData.form;
    };
    CrudCreate.prototype.ngOnDestroy = function () {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    };
    CrudCreate.prototype.onSubmit = function () {
        this.crudService.createRecord(this.crudService.model, this.route.snapshot.params['className']);
    };
    CrudCreate = __decorate([
        core_1.Component({
            selector: 'crud-create',
            template: '<dynamic-form [btnName]="btnName"></dynamic-form>',
            styleUrls: [
                require('../common/style.scss')
            ],
            providers: [common_1.Location]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, crud_service_1.CrudService, router_1.Router, router_1.ActivatedRoute, common_1.Location])
    ], CrudCreate);
    return CrudCreate;
}());
exports.CrudCreate = CrudCreate;
//# sourceMappingURL=crud.create.component.js.map