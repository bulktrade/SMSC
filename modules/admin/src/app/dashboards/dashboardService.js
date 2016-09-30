"use strict";
var orientdb_service_1 = require("../orientdb/orientdb.service");
var core_1 = require("@angular/core");
var dashboardBox_1 = require("./models/dashboardBox");
var crud_service_1 = require("../crud/crud.service");
var grid_service_1 = require("../services/grid.service");
var common_1 = require("@angular/common");
var Observable_1 = require("rxjs/Observable");
var batchType_1 = require("../orientdb/model/batchType");
var squel = require('squel');
var DashboardService = (function () {
    function DashboardService(databaseService, crudService, location, gridService) {
        this.databaseService = databaseService;
        this.crudService = crudService;
        this.location = location;
        this.gridService = gridService;
    }
    /**
     * Get dashboard boxes
     *
     * @returns {any}
     */
    DashboardService.prototype.getDashboardBoxes = function () {
        var _this = this;
        var query = squel.select()
            .from('DashboardBox')
            .field('*')
            .toString();
        return Observable_1.Observable.create(function (observer) {
            _this.databaseService.query(query, 50, '*:3').subscribe(function (res) {
                var result = [];
                for (var _i = 0, _a = res.json().result; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.width = parseInt(item.width[0]);
                    item.height = parseInt(item.height[0]);
                    result.push(new dashboardBox_1.DashboardBox(item));
                }
                observer.next(result);
                observer.complete();
            }, function (ex) {
                observer.error(ex);
                observer.complete();
            });
        });
    };
    /**
     * Get single dashboard box
     *
     * @param rid - dashboard rid
     * @returns {Promise<DashboardBox>|Promise<TResult|DashboardBox>|Promise<U>}
     */
    DashboardService.prototype.getDashboardBox = function (rid) {
        var _this = this;
        var query = squel.select()
            .from('DashboardBox')
            .field('*')
            .where('@rid = ?', rid)
            .toString();
        return Observable_1.Observable.create(function (observer) {
            _this.databaseService.query(query, 1, '*:3').subscribe(function (res) {
                var result = new dashboardBox_1.DashboardBox(res.json().result[0]);
                observer.next(result);
                observer.complete();
            }, function (ex) {
                observer.error(ex);
                observer.complete();
            });
        });
    };
    /**
     * Update box width
     *
     * width - box width(25/50/75/100)
     * height - box height(25/50/75/100)
     * rid - @rid
     */
    DashboardService.prototype.updateBoxSize = function (size, item) {
        var _this = this;
        var send = item.getORecord();
        send['width'] = size['width'];
        send['height'] = size['height'];
        var obj = {
            type: batchType_1.BatchType.UPDATE,
            record: send
        };
        var options = [obj];
        return Observable_1.Observable.create(function (observer) {
            _this.databaseService.batch(options).subscribe(function (res) {
                var result = JSON.parse(res['_body']);
                observer.next(result.result[0]);
                observer.complete();
            });
        });
    };
    /**
     * Delete one box
     * @param rid - box @rid
     */
    DashboardService.prototype.deleteBox = function (box) {
        var obj = {
            type: batchType_1.BatchType.DELETE,
            record: box.getORecord()
        };
        var options = [obj];
        this.databaseService.batch(options).subscribe(function (res) {
            console.log(res);
        });
    };
    /**
     * Batch update
     *
     * @param list - list of boxes
     */
    DashboardService.prototype.batchUpdateDashboardBox = function (list) {
        var _this = this;
        var operations = [];
        for (var key in list) {
            var oRecord = list[key].getORecord();
            var tmp = {
                type: batchType_1.BatchType.UPDATE,
                record: oRecord
            };
            operations.push(tmp);
        }
        return Observable_1.Observable.create(function (observer) {
            _this.databaseService.batch(operations).subscribe(function (res) {
                _this.getDashboardBoxes().subscribe(function (res) {
                    observer.next(res);
                    observer.complete();
                }, function (ex) {
                    observer.error(ex);
                    observer.complete();
                });
            });
        });
    };
    /**
     * Get dashboard box class columns
     *
     * @param route
     * @param state
     * @param id
     * @param className
     * @returns {Subscription}
     */
    DashboardService.prototype.getBoxFormColumns = function (route, state, id, className) {
        var _this = this;
        this.crudService.setParentPath(route.parent.pathFromRoot);
        this.crudService.setClassName(className);
        return Observable_1.Observable.create(function (observer) {
            _this.crudService.databaseService.load(id)
                .then(function (res) {
                var result = JSON.parse(res['_body']);
                var model = [];
                _this.crudService.model = _this.crudService.model || {};
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
    DashboardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [orientdb_service_1.ODatabaseService, crud_service_1.CrudService, common_1.Location, grid_service_1.GridService])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboardService.js.map