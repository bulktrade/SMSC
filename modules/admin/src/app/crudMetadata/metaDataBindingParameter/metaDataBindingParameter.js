"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var MetaDataPropertyBindingParameter = (function () {
    function MetaDataPropertyBindingParameter(translate) {
        this.translate = translate;
    }
    MetaDataPropertyBindingParameter.prototype.ngOnInit = function () {
    };
    MetaDataPropertyBindingParameter = __decorate([
        core_1.Component({
            selector: 'binding-parameter',
            template: '<loading-router-outlet></loading-router-outlet>',
            styleUrls: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], MetaDataPropertyBindingParameter);
    return MetaDataPropertyBindingParameter;
}());
exports.MetaDataPropertyBindingParameter = MetaDataPropertyBindingParameter;
//# sourceMappingURL=metaDataBindingParameter.js.map