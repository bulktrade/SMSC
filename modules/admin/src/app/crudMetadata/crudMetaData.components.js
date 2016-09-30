"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var breadcrumb_component_1 = require('../breadcrumb/breadcrumb.component');
var CrudMetaData = (function () {
    function CrudMetaData(translate) {
        this.translate = translate;
    }
    CrudMetaData.prototype.ngOnInit = function () {
    };
    CrudMetaData = __decorate([
        core_1.Component({
            selector: 'crud-metadata',
            template: require('./crudMetaData.html'),
            styleUrls: [
                require('./crudMetaData.scss')
            ],
            providers: [breadcrumb_component_1.Breadcrumb]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], CrudMetaData);
    return CrudMetaData;
}());
exports.CrudMetaData = CrudMetaData;
//# sourceMappingURL=crudMetaData.components.js.map