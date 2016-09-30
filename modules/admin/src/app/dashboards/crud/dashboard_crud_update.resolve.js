"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var grid_service_1 = require("../../services/grid.service");
var crud_service_1 = require("../../crud/crud.service");
var crudResolve_1 = require("../../crud/common/crudResolve");
var dashboardService_1 = require("../dashboardService");
var DashboardCrudUpdateResolve = (function (_super) {
    __extends(DashboardCrudUpdateResolve, _super);
    function DashboardCrudUpdateResolve(crudService, location, gridService, dashboardService) {
        _super.call(this);
        this.crudService = crudService;
        this.location = location;
        this.gridService = gridService;
        this.dashboardService = dashboardService;
    }
    DashboardCrudUpdateResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'];
        var className = route.parent.data['crudClass'];
        return this.dashboardService.getBoxFormColumns(route, state, id, className);
    };
    DashboardCrudUpdateResolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [crud_service_1.CrudService, common_1.Location, grid_service_1.GridService, dashboardService_1.DashboardService])
    ], DashboardCrudUpdateResolve);
    return DashboardCrudUpdateResolve;
}(crudResolve_1.CrudResolve));
exports.DashboardCrudUpdateResolve = DashboardCrudUpdateResolve;
//# sourceMappingURL=dashboard_crud_update.resolve.js.map