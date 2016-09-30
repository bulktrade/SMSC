"use strict";
var core_1 = require('@angular/core');
var crudResolve_1 = require('../common/crudResolve');
var crud_service_1 = require('../crud.service');
var CrudLinksetResolve = (function (_super) {
    __extends(CrudLinksetResolve, _super);
    function CrudLinksetResolve(crudService) {
        _super.call(this);
        this.crudService = crudService;
    }
    CrudLinksetResolve.prototype.resolve = function (route, state) {
        if (this.crudService.isLimitCrudLevel()) {
            return this.crudService.getColumnDefs(this.crudService.getLinkedClass(), false);
        }
        else {
            return this.crudService.getColumnDefs(this.crudService.getLinkedClass(), true);
        }
    };
    CrudLinksetResolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [crud_service_1.CrudService])
    ], CrudLinksetResolve);
    return CrudLinksetResolve;
}(crudResolve_1.CrudResolve));
exports.CrudLinksetResolve = CrudLinksetResolve;
//# sourceMappingURL=crud.linkset.resolve.js.map