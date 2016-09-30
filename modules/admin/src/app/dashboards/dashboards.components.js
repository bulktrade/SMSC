"use strict";
var core_1 = require("@angular/core");
var breadcrumb_component_1 = require("../breadcrumb/breadcrumb.component");
var Dashboards = (function () {
    function Dashboards() {
    }
    Dashboards = __decorate([
        core_1.Component({
            selector: 'dashboard',
            providers: [breadcrumb_component_1.Breadcrumb],
            template: '<loading-router-outlet></loading-router-outlet>'
        }), 
        __metadata('design:paramtypes', [])
    ], Dashboards);
    return Dashboards;
}());
exports.Dashboards = Dashboards;
//# sourceMappingURL=dashboards.components.js.map