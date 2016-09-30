"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var CrudMetaGridData = (function () {
    function CrudMetaGridData(translate) {
        this.translate = translate;
    }
    CrudMetaGridData.prototype.ngOnInit = function () {
    };
    CrudMetaGridData = __decorate([
        core_1.Component({
            selector: 'crudMetaGridData',
            template: '<loading-router-outlet></loading-router-outlet>',
            styleUrls: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], CrudMetaGridData);
    return CrudMetaGridData;
}());
exports.CrudMetaGridData = CrudMetaGridData;
//# sourceMappingURL=crudMetaGridData.component.js.map