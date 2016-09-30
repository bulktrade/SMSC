"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var CrudClassMetaData = (function () {
    function CrudClassMetaData(translate) {
        this.translate = translate;
    }
    CrudClassMetaData.prototype.ngOnInit = function () {
    };
    CrudClassMetaData = __decorate([
        core_1.Component({
            selector: 'crudClassMetaData',
            template: '<loading-router-outlet></loading-router-outlet>',
            styleUrls: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], CrudClassMetaData);
    return CrudClassMetaData;
}());
exports.CrudClassMetaData = CrudClassMetaData;
//# sourceMappingURL=crudClassMetaData.component.js.map