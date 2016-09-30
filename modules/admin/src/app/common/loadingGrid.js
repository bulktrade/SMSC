"use strict";
var core_1 = require('@angular/core');
var loadingGrid_service_1 = require('../services/loading/loadingGrid.service');
var crud_service_1 = require('../crud/crud.service');
var cubeGrid_component_1 = require('./spinner/cubeGrid/cubeGrid.component');
var common_1 = require('@angular/common');
var LoadingGrid = (function () {
    function LoadingGrid(service, crudService) {
        this.service = service;
        this.crudService = crudService;
    }
    LoadingGrid.prototype.ngOnInit = function () {
    };
    LoadingGrid = __decorate([
        core_1.Component({
            selector: 'loading-grid',
            template: "\n        <sk-cube-grid [isRunning]='service.loading'></sk-cube-grid>\n        <ng-content *ngIf=\"!service.loading\"></ng-content>\n    "
        }), 
        __metadata('design:paramtypes', [loadingGrid_service_1.LoadingGridService, crud_service_1.CrudService])
    ], LoadingGrid);
    return LoadingGrid;
}());
exports.LoadingGrid = LoadingGrid;
var LoadingGridModule = (function () {
    function LoadingGridModule() {
    }
    LoadingGridModule.forRoot = function () {
        return {
            ngModule: LoadingGridModule,
            providers: []
        };
    };
    LoadingGridModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, cubeGrid_component_1.CubeGridModule],
            exports: [LoadingGrid],
            declarations: [LoadingGrid]
        }), 
        __metadata('design:paramtypes', [])
    ], LoadingGridModule);
    return LoadingGridModule;
}());
exports.LoadingGridModule = LoadingGridModule;
//# sourceMappingURL=loadingGrid.js.map