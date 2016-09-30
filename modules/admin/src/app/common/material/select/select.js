"use strict";
var core_1 = require('@angular/core');
var async_1 = require('@angular/common/src/facade/async');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var MdSelect = (function () {
    function MdSelect() {
        this.modelChange = new async_1.EventEmitter();
        this.valid = new async_1.EventEmitter();
    }
    MdSelect.prototype.ngOnInit = function () {
        this.checkOnValid(this.model);
    };
    MdSelect.prototype.onChange = function (event) {
        this.checkOnValid(event.target.value);
        this.modelChange.emit(event.target.value);
    };
    MdSelect.prototype.checkOnValid = function (value) {
        if (!Array.isArray(value) && this.required) {
            this.valid.emit(false);
        }
        else if (Array.isArray(value) && this.required) {
            if (value.length) {
                this.valid.emit(false);
            }
            else {
                this.valid.emit(true);
            }
        }
        else {
            this.valid.emit(false);
        }
    };
    __decorate([
        core_1.Input('options'), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "options", void 0);
    __decorate([
        core_1.Input('placeholder'), 
        __metadata('design:type', String)
    ], MdSelect.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input('required'), 
        __metadata('design:type', Boolean)
    ], MdSelect.prototype, "required", void 0);
    __decorate([
        core_1.Input('model'), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "model", void 0);
    __decorate([
        core_1.Output('modelChange'), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "modelChange", void 0);
    __decorate([
        core_1.Output('valid'), 
        __metadata('design:type', Object)
    ], MdSelect.prototype, "valid", void 0);
    MdSelect = __decorate([
        core_1.Component({
            selector: 'md-select',
            providers: [],
            template: require('./select.html'),
            styleUrls: [
                require('./select.scss'),
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MdSelect);
    return MdSelect;
}());
exports.MdSelect = MdSelect;
var MdSelectModule = (function () {
    function MdSelectModule() {
    }
    MdSelectModule.forRoot = function () {
        return {
            ngModule: MdSelectModule,
            providers: []
        };
    };
    MdSelectModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            exports: [MdSelect],
            declarations: [MdSelect]
        }), 
        __metadata('design:paramtypes', [])
    ], MdSelectModule);
    return MdSelectModule;
}());
exports.MdSelectModule = MdSelectModule;
//# sourceMappingURL=select.js.map