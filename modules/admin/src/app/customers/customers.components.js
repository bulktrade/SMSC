"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var breadcrumb_component_1 = require('../breadcrumb/breadcrumb.component');
var Customers = (function () {
    function Customers(translate) {
        this.translate = translate;
    }
    Customers.prototype.ngOnInit = function () {
    };
    Customers = __decorate([
        core_1.Component({
            providers: [breadcrumb_component_1.Breadcrumb],
            selector: 'customers',
            template: require('./customers.html'),
            styleUrls: [
                require('./customers.scss')
            ]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], Customers);
    return Customers;
}());
exports.Customers = Customers;
//# sourceMappingURL=customers.components.js.map