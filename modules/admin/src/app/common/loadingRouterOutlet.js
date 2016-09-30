"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var cubeGrid_component_1 = require('./spinner/cubeGrid/cubeGrid.component');
var loadingRouterOutlet_service_1 = require('../services/loading/loadingRouterOutlet.service');
var routerOutletService_1 = require('../services/routerOutletService');
var LoadingRouterOutlet = (function () {
    function LoadingRouterOutlet(loadingService, roService) {
        this.loadingService = loadingService;
        this.roService = roService;
    }
    LoadingRouterOutlet.prototype.onActivate = function (event) {
        this.roService.currentRoute = event;
    };
    LoadingRouterOutlet.prototype.onDeactivate = function (event) {
        this.roService.previousRoute = event;
    };
    LoadingRouterOutlet = __decorate([
        core_1.Component({
            selector: 'loading-router-outlet',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [
                "\n        router-outlet.hide + * {\n            display: none;\n        }\n\n        .cubeGrid sk-cube-grid,\n        .cubeGrid {\n            height: 100%;\n            width: 100%;\n            display: flex;\n        }\n\n        .cubeGrid .cube-grid-spinner {\n            margin: auto !important;\n        }\n    "
            ],
            template: "\n        <div class=\"cubeGrid\" *ngIf=\"loadingService.loading\"><sk-cube-grid></sk-cube-grid></div>\n        <router-outlet [ngClass]=\"{hide: loadingService.loading}\" (activate)='onActivate($event)'\n         (deactivate)='onDeactivate($event)'></router-outlet>\n    "
        }), 
        __metadata('design:paramtypes', [loadingRouterOutlet_service_1.LoadingRouterOutletService, routerOutletService_1.RouterOutletService])
    ], LoadingRouterOutlet);
    return LoadingRouterOutlet;
}());
exports.LoadingRouterOutlet = LoadingRouterOutlet;
var LoadingRouterOutletModule = (function () {
    function LoadingRouterOutletModule() {
    }
    LoadingRouterOutletModule.forRoot = function () {
        return {
            ngModule: LoadingRouterOutletModule,
            providers: []
        };
    };
    LoadingRouterOutletModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, cubeGrid_component_1.CubeGridModule, router_1.RouterModule],
            exports: [LoadingRouterOutlet],
            declarations: [LoadingRouterOutlet]
        }), 
        __metadata('design:paramtypes', [])
    ], LoadingRouterOutletModule);
    return LoadingRouterOutletModule;
}());
exports.LoadingRouterOutletModule = LoadingRouterOutletModule;
//# sourceMappingURL=loadingRouterOutlet.js.map