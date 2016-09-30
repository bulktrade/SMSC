"use strict";
var core_1 = require('@angular/core');
var crudResolve_1 = require('../common/crudResolve');
var crud_service_1 = require('../crud.service');
var CrudCreateResolve = (function (_super) {
    __extends(CrudCreateResolve, _super);
    function CrudCreateResolve(crudService) {
        _super.call(this);
        this.crudService = crudService;
    }
    CrudCreateResolve.prototype.resolve = function (route, state) {
        var className = route.params['className'];
        this.crudService.setParentPath(route.parent.parent.pathFromRoot);
        return this.crudService.getColumnDefs(className, false);
    };
    CrudCreateResolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [crud_service_1.CrudService])
    ], CrudCreateResolve);
    return CrudCreateResolve;
}(crudResolve_1.CrudResolve));
exports.CrudCreateResolve = CrudCreateResolve;
//# sourceMappingURL=crud.create.resolve.js.map