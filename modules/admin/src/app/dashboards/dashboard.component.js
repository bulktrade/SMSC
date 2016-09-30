"use strict";
var core_1 = require("@angular/core");
var breadcrumb_component_1 = require("../breadcrumb/breadcrumb.component");
var Dashboard = (function () {
    function Dashboard() {
    }
    Dashboard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            providers: [breadcrumb_component_1.Breadcrumb],
            template: '<loading-router-outlet></loading-router-outlet>',
        }), 
        __metadata('design:paramtypes', [])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.component.js.map