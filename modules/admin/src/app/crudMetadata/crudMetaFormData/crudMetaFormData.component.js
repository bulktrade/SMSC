"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var CrudMetaFormData = (function () {
    function CrudMetaFormData(translate) {
        this.translate = translate;
    }
    CrudMetaFormData.prototype.ngOnInit = function () {
    };
    CrudMetaFormData = __decorate([
        core_1.Component({
            selector: 'crudMetaFormData',
            template: '<loading-router-outlet></loading-router-outlet>',
            styleUrls: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], CrudMetaFormData);
    return CrudMetaFormData;
}());
exports.CrudMetaFormData = CrudMetaFormData;
//# sourceMappingURL=crudMetaFormData.component.js.map