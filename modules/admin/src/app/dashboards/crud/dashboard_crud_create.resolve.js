"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var grid_service_1 = require("../../services/grid.service");
var crud_service_1 = require("../../crud/crud.service");
var crudResolve_1 = require("../../crud/common/crudResolve");
var dashboardService_1 = require("../dashboardService");
var DashboardCrudCreateResolve = (function (_super) {
    __extends(DashboardCrudCreateResolve, _super);
    function DashboardCrudCreateResolve(crudService, location, gridService, dashboardService) {
        _super.call(this);
        this.crudService = crudService;
        this.location = location;
        this.gridService = gridService;
        this.dashboardService = dashboardService;
    }
    DashboardCrudCreateResolve.prototype.resolve = function (route, state) {
        var className = route.parent.data['crudClass'];
        this.crudService.setParentPath(route.parent.pathFromRoot);
        this.crudService.getColumnDefs(className, false).subscribe(function (res) {
            console.log(res);
        });
        return this.crudService.getColumnDefs(className, false);
    };
    DashboardCrudCreateResolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [crud_service_1.CrudService, common_1.Location, grid_service_1.GridService, dashboardService_1.DashboardService])
    ], DashboardCrudCreateResolve);
    return DashboardCrudCreateResolve;
}(crudResolve_1.CrudResolve));
exports.DashboardCrudCreateResolve = DashboardCrudCreateResolve;
//# sourceMappingURL=dashboard_crud_create.resolve.js.map