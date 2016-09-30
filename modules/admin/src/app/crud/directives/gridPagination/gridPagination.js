"use strict";
var core_1 = require('@angular/core');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var orientdb_service_1 = require('../../../orientdb/orientdb.service');
var notificationService_1 = require('../../../services/notificationService');
var grid_service_1 = require('../../../services/grid.service');
var common_1 = require('@angular/common');
var select_1 = require('../../../common/material/select/select');
var md_module_1 = require('../../../md.module');
var rxjs_1 = require('rxjs');
var crudLevel_1 = require('../../model/crudLevel');
var squel = require('squel');
var GridPagination = (function () {
    function GridPagination(translate, gridService, databaseService, serviceNotifications) {
        this.translate = translate;
        this.gridService = gridService;
        this.databaseService = databaseService;
        this.serviceNotifications = serviceNotifications;
        this.rowsThisPage = [];
        this.stepPageSize = [25, 50, 150, 200, 300];
        this.pageSize = 25;
        this.currentPage = 0;
    }
    GridPagination.prototype.ngOnInit = function () {
        var _this = this;
        this.translate.get('ALL_RECORDS')
            .subscribe(function (res) {
            _this.stepPageSize.push(res);
        });
        this.changePageSize();
    };
    GridPagination.prototype.changePageSize = function () {
        var _this = this;
        if (this.pageSize === 'All records') {
            this.createNewDatasource();
        }
        else {
            this.getSizeClass(this.className)
                .subscribe(function (size) {
                if (_this.currentPage * _this.pageSize <= size) {
                    var skip = _this.currentPage * _this.pageSize;
                    var limit = _this.pageSize;
                    _this.createNewDatasource(skip, limit);
                }
                else {
                    var lastRows = size - _this.currentPage * _this.pageSize;
                    if (lastRows) {
                        var skip = _this.currentPage * _this.pageSize;
                        var limit = lastRows;
                        _this.createNewDatasource(skip, limit);
                    }
                }
            });
        }
    };
    GridPagination.prototype.first = function () {
        this.setCurrentPage(0);
        var skip = this.currentPage * this.pageSize;
        var limit = this.pageSize;
        this.createNewDatasource(skip, limit);
    };
    GridPagination.prototype.last = function () {
        var _this = this;
        this.getSizeClass(this.className)
            .subscribe(function (size) {
            var remainderRows = size % _this.pageSize;
            _this.setCurrentPage(Math.floor(size / _this.pageSize));
            if (remainderRows) {
                var skip = _this.currentPage * _this.pageSize;
                var limit = remainderRows;
                return _this.createNewDatasource(skip, limit);
            }
            else {
                var skip = _this.currentPage * _this.pageSize;
                var limit = _this.pageSize;
                return _this.createNewDatasource(skip, limit);
            }
        });
    };
    GridPagination.prototype.previous = function () {
        if ((this.currentPage - 1) * this.pageSize >= 0) {
            this.currentPage -= 1;
            var skip = this.currentPage * this.pageSize;
            var limit = this.pageSize;
            this.createNewDatasource(skip, limit);
        }
    };
    GridPagination.prototype.next = function () {
        var _this = this;
        return rxjs_1.Observable.create(function (observer) {
            _this.getSizeClass(_this.className)
                .subscribe(function (size) {
                if ((_this.currentPage + 1) * _this.pageSize < size) {
                    _this.currentPage += 1;
                    var skip = _this.currentPage * _this.pageSize;
                    var limit = _this.pageSize;
                    return _this.createNewDatasource(skip, limit)
                        .then(function (res) {
                        observer.next(res);
                        observer.complete();
                    }, function (err) {
                        observer.error(err);
                        observer.complete();
                    });
                }
                else {
                    var lastRows = size - _this.currentPage * _this.pageSize;
                    if (lastRows) {
                        var skip = _this.currentPage * _this.pageSize;
                        var limit = lastRows;
                        return _this.createNewDatasource(skip, limit)
                            .then(function (res) {
                            observer.next(res);
                            observer.complete();
                        }, function (err) {
                            observer.error(err);
                            observer.complete();
                        });
                    }
                }
            }, function (error) {
                observer.error(error);
                observer.complete();
            });
        });
    };
    GridPagination.prototype.createNewDatasource = function (skip, limit) {
        var _this = this;
        var sql = squel.select()
            .from(this.className);
        if (skip !== undefined && limit !== undefined) {
            sql
                .offset(skip)
                .limit(limit);
        }
        return this.gridService.combineOperators(this.currentCrudLevel)
            .then(function (res) {
            if (res !== null) {
                sql.where(res);
            }
            if (_this.gridOptions.api) {
                _this.gridOptions.api.showLoadingOverlay();
            }
            return new Promise(function (resolve, reject) {
                _this.databaseService.query(sql.toString())
                    .subscribe(function (queryRes) {
                    _this.rowsThisPage = queryRes.json().result;
                    if (skip === undefined && limit === undefined) {
                        _this.fromRecord = 0;
                        _this.toRecord = _this.rowsThisPage.length;
                    }
                    else {
                        _this.setFromRecord();
                        _this.setToRecord(_this.rowsThisPage.length);
                    }
                    _this.gridService.selectLinksetProperties(_this.gridOptions.columnDefs, _this.rowsThisPage)
                        .then(function () {
                        if (_this.gridOptions.api) {
                            _this.gridOptions.api.setRowData(_this.rowsThisPage);
                            _this.gridOptions.rowData = _this.rowsThisPage;
                            _this.gridOptions.api.hideOverlay();
                        }
                        resolve(_this.rowsThisPage);
                    });
                }, function (error) {
                    _this.serviceNotifications.createNotificationOnResponse(error);
                    reject(error);
                });
            });
        });
    };
    GridPagination.prototype.getSizeClass = function (className) {
        var _this = this;
        var classSize = squel.select()
            .from(className);
        return rxjs_1.Observable.create(function (observer) {
            _this.databaseService.query(classSize.toString())
                .subscribe(function (res) {
                observer.next(res.json().result.length);
                observer.complete();
            }, function (error) {
                _this.serviceNotifications.createNotificationOnResponse(error);
                observer.error(error);
                observer.complete();
            });
        });
    };
    GridPagination.prototype.getCurrentPage = function () {
        return this.currentPage;
    };
    GridPagination.prototype.setCurrentPage = function (value) {
        this.currentPage = value;
    };
    GridPagination.prototype.setFromRecord = function () {
        this.fromRecord = this.currentPage * this.pageSize;
    };
    GridPagination.prototype.setToRecord = function (numberRecords) {
        this.toRecord = this.currentPage * this.pageSize + numberRecords;
    };
    __decorate([
        core_1.Input('className'), 
        __metadata('design:type', String)
    ], GridPagination.prototype, "className", void 0);
    __decorate([
        core_1.Input('gridOptions'), 
        __metadata('design:type', Object)
    ], GridPagination.prototype, "gridOptions", void 0);
    __decorate([
        core_1.Input('currentCrudLevel'), 
        __metadata('design:type', crudLevel_1.CrudLevel)
    ], GridPagination.prototype, "currentCrudLevel", void 0);
    GridPagination = __decorate([
        core_1.Component({
            selector: 'grid-pagination',
            providers: [],
            template: require('./gridPagination.html'),
            styleUrls: [
                require('./gridPagination.scss'),
            ]
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, grid_service_1.GridService, orientdb_service_1.ODatabaseService, notificationService_1.NotificationService])
    ], GridPagination);
    return GridPagination;
}());
exports.GridPagination = GridPagination;
var GridPaginationModule = (function () {
    function GridPaginationModule() {
    }
    GridPaginationModule.forRoot = function () {
        return {
            ngModule: GridPaginationModule,
            providers: []
        };
    };
    GridPaginationModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, select_1.MdSelectModule, md_module_1.MdModule.forRoot()],
            exports: [GridPagination],
            declarations: [GridPagination]
        }), 
        __metadata('design:paramtypes', [])
    ], GridPaginationModule);
    return GridPaginationModule;
}());
exports.GridPaginationModule = GridPaginationModule;
//# sourceMappingURL=gridPagination.js.map