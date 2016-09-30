"use strict";
var core_1 = require('@angular/core');
var authGuard_1 = require("../common/authGuard");
var DashboardGuard = (function (_super) {
    __extends(DashboardGuard, _super);
    function DashboardGuard() {
        _super.apply(this, arguments);
    }
    DashboardGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DashboardGuard);
    return DashboardGuard;
}(authGuard_1.AuthGuard));
exports.DashboardGuard = DashboardGuard;
//# sourceMappingURL=dashboard.guard.js.map