"use strict";
var core_1 = require('@angular/core');
var crudResolve_1 = require('../common/crudResolve');
var crud_service_1 = require('../crud.service');
var common_1 = require('@angular/common');
var grid_service_1 = require('../../services/grid.service');
var rxjs_1 = require('rxjs');
var CrudEditResolve = (function (_super) {
    __extends(CrudEditResolve, _super);
    function CrudEditResolve(crudService, location, gridService) {
        _super.call(this);
        this.crudService = crudService;
        this.location = location;
        this.gridService = gridService;
    }
    CrudEditResolve.prototype.resolve = function (route, state) {
        var _this = this;
        var id = route.params['id'];
        this.crudService.setParentPath(route.parent.parent.pathFromRoot);
        return rxjs_1.Observable.create(function (observer) {
            _this.crudService.databaseService.load(id)
                .then(function (res) {
                var result = res.json();
                var className = result['@class'];
                var model = [];
                if (!Object.keys(_this.crudService.model).length) {
                    model.push(result);
                }
                _this.crudService.getColumnDefs(className, false)
                    .subscribe(function (columnDefs) {
                    return _this.gridService.selectLinksetProperties(columnDefs.form, model)
                        .then(function () {
                        var editModel = {
                            columnDefs: columnDefs,
                            inputModel: model[0]
                        };
                        observer.next(editModel);
                        observer.complete();
                    });
                }, function (error) {
                    _this.crudService.serviceNotifications.createNotificationOnResponse(error);
                    observer.error(error);
                    observer.complete();
                });
            }, function (error) {
                _this.crudService.serviceNotifications.createNotificationOnResponse(error);
                _this.location.back();
                observer.error(error);
                observer.complete();
            });
        });
    };
    CrudEditResolve = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [crud_service_1.CrudService, common_1.Location, grid_service_1.GridService])
    ], CrudEditResolve);
    return CrudEditResolve;
}(crudResolve_1.CrudResolve));
exports.CrudEditResolve = CrudEditResolve;
//# sourceMappingURL=crud.edit.resolve.js.map