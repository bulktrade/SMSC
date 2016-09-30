"use strict";
var core_1 = require('@angular/core');
var crudResolve_1 = require('../common/crudResolve');
var crud_service_1 = require('../crud.service');
var loadingGrid_service_1 = require('../../services/loading/loadingGrid.service');
var rxjs_1 = require('rxjs');
var CrudViewResolve = (function (_super) {
    __extends(CrudViewResolve, _super);
    function CrudViewResolve(crudService, loadingGridService) {
        _super.call(this);
        this.crudService = crudService;
        this.loadingGridService = loadingGridService;
    }
    CrudViewResolve.prototype.resolve = function (route, state) {
        var _this = this;
        this.crudService.setClassName(route.parent.parent.data['crudClass']);
        this.crudService.setParentPath(route.parent.parent.pathFromRoot);
        this.loadingGridService.start();
        return rxjs_1.Observable.create(function (observer) {
            _this.crudService.getColumnDefs(_this.crudService.getClassName(), true)
                .subscribe(function (res) {
                _this.loadingGridService.stop();
                observer.next(res);
                observer.complete();
            }, function (err) {
                _this.loadingGridService.stop();
                observer.error(err);
                observer.complete();
            });
        });
    };
    CrudViewResolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [crud_service_1.CrudService, loadingGrid_service_1.LoadingGridService])
    ], CrudViewResolve);
    return CrudViewResolve;
}(crudResolve_1.CrudResolve));
exports.CrudViewResolve = CrudViewResolve;
//# sourceMappingURL=crud.view.resolve.js.map