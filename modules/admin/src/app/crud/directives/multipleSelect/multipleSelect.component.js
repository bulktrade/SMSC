"use strict";
var core_1 = require("@angular/core");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var router_1 = require("@angular/router");
var async_1 = require("@angular/common/src/facade/async");
var common_1 = require("@angular/common");
var crud_service_1 = require("../../crud.service");
var md_module_1 = require("../../../md.module");
var forms_1 = require("@angular/forms");
var MultipleSelect = (function () {
    function MultipleSelect(translate, route, router, location, crudService) {
        this.translate = translate;
        this.route = route;
        this.router = router;
        this.location = location;
        this.crudService = crudService;
        this.isRequired = new async_1.EventEmitter();
        this.requiredSymb = ' ';
        this.ridItems = [];
    }
    MultipleSelect.prototype.ngOnInit = function () {
        var _this = this;
        if (this.property.mandatory) {
            this.requiredSymb += '*';
        }
        this.crudService.initGridData.then(function () {
            _this.crudService.rowSelectionLinkset = _this.rowSelectionLinkset;
            var linkset = [];
            if (_this.crudService.model[_this.property.property]) {
                linkset = (Array.isArray(_this.crudService.model[_this.property.property]) ?
                    _this.crudService.model[_this.property.property] : _this.crudService.model[_this.property.property].split(','));
            }
            if (linkset) {
                linkset.forEach(function (item) {
                    if (item) {
                        _this.ridItems.push({
                            name: item, visible: true
                        });
                    }
                });
                if (_this.property.mandatory) {
                    if (linkset.length) {
                        _this.isRequired.emit(false);
                    }
                    else {
                        _this.isRequired.emit(true);
                    }
                }
                else {
                    _this.isRequired.emit(false);
                }
            }
            else if (_this.property.mandatory) {
                _this.isRequired.emit(true);
            }
            else {
                _this.isRequired.emit(false);
            }
        });
    };
    MultipleSelect.prototype.removeItem = function () {
        this.crudService.multipleSelectValid = false;
        var linkset = Array.isArray(this.crudService.model[this.property.property]) ?
            this.crudService.model[this.property.property] : this.crudService.model[this.property.property].split(',');
        var model = [];
        for (var i in this.ridItems) {
            if (this.ridItems[i].visible) {
                model['_' + model.length] = linkset['_' + model.length];
                model.push(linkset[i]);
            }
        }
        if (this.property.mandatory) {
            if (model.length) {
                this.isRequired.emit(false);
            }
            else {
                this.isRequired.emit(true);
            }
        }
        else {
            this.isRequired.emit(false);
        }
        this.crudService.model[this.property.property] = model;
    };
    MultipleSelect.prototype.clearAll = function () {
        this.resetParams();
        this.crudService.multipleSelectValid = true;
    };
    MultipleSelect.prototype.addLinkset = function () {
        this.resetParams();
        this.crudService.multipleSelectValid = false;
        var linsetProperty = {
            name: this.property.property,
            type: this.property.type,
            data: this.crudService.model,
            bingingProperties: this.property.bingingProperties
        };
        this.crudService.navigateToLinkset(linsetProperty);
        this.crudService.setLinkedClass(this.property.linkedClass);
    };
    MultipleSelect.prototype.resetParams = function () {
        this.crudService.titleColumns[this.property.property] = [];
        this.crudService.model[this.property.property] = [];
        this.crudService.titleColumns = [];
        this.ridItems = [];
    };
    __decorate([
        core_1.Input('property'), 
        __metadata('design:type', Object)
    ], MultipleSelect.prototype, "property", void 0);
    __decorate([
        core_1.Input('rowSelectionLinkset'), 
        __metadata('design:type', String)
    ], MultipleSelect.prototype, "rowSelectionLinkset", void 0);
    MultipleSelect = __decorate([
        core_1.Component({
            selector: 'multiple-select',
            template: require('./multipleSelect.html'),
            styleUrls: [
                require('./multipleSelect.scss')
            ],
            providers: [],
            outputs: ['isRequired']
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, router_1.ActivatedRoute, router_1.Router, common_1.Location, crud_service_1.CrudService])
    ], MultipleSelect);
    return MultipleSelect;
}());
exports.MultipleSelect = MultipleSelect;
var MultipleSelectModule = (function () {
    function MultipleSelectModule() {
    }
    MultipleSelectModule.forRoot = function () {
        return {
            ngModule: MultipleSelectModule,
            providers: []
        };
    };
    MultipleSelectModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                md_module_1.MdModule.forRoot(),
                ng2_translate_1.TranslateModule
            ],
            exports: [MultipleSelect],
            declarations: [MultipleSelect]
        }), 
        __metadata('design:paramtypes', [])
    ], MultipleSelectModule);
    return MultipleSelectModule;
}());
exports.MultipleSelectModule = MultipleSelectModule;
//# sourceMappingURL=multipleSelect.component.js.map