"use strict";
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var app_module_1 = require("../app.module");
var dashboard_view_component_1 = require("./dashboard_view.component");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var dashboardService_1 = require("./dashboardService");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var crud_service_1 = require("../crud/crud.service");
var router_1 = require("@angular/router");
var crudProviders_1 = require("../crud/common/crudProviders");
var grid_service_1 = require("../services/grid.service");
var MockLocation = (function () {
    function MockLocation() {
    }
    return MockLocation;
}());
;
describe('Dashboard view', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                dashboard_view_component_1.DashboardView,
                ng2_translate_1.TranslateService,
                ng2_dragula_1.DragulaService,
                dashboardService_1.DashboardService,
                ng2_translate_1.TranslateLoader
            ].concat(crudProviders_1.CRUD_PROVIDERS, app_module_1.APP_PROVIDERS, [
                grid_service_1.GridService,
                testing_2.MockBackend,
                http_1.BaseRequestOptions,
                { provide: router_1.Router, useClass: MockLocation },
                { provide: common_1.Location, useClass: MockLocation },
                {
                    provide: http_1.Http, useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }, deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                },
                crud_service_1.CrudService
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined CSS boxes', testing_1.inject([dashboard_view_component_1.DashboardView], function (box) {
        expect(box.boxesCss).toBeDefined();
    }));
    it('should be defined boxes list', testing_1.inject([dashboard_view_component_1.DashboardView], function (box) {
        expect(box.boxes).toBeDefined();
    }));
    it('Get box class name', testing_1.inject([dashboard_view_component_1.DashboardView], function (box) {
        expect(box.getBoxClass(25, 'chart')).toBeDefined('chart-m');
    }));
});
//# sourceMappingURL=dashboard_view.spec.js.map