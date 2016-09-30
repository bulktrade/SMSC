"use strict";
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var dashboardService_1 = require("./dashboardService");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var crud_service_1 = require("../crud/crud.service");
var router_1 = require("@angular/router");
var crudProviders_1 = require("../crud/common/crudProviders");
var grid_service_1 = require("../services/grid.service");
var sidebarService_1 = require("../sidebar/sidebarService");
var dashboard_box_component_1 = require("./dashboard_box.component");
var MockLocation = (function () {
    function MockLocation() {
    }
    return MockLocation;
}());
;
describe('Dashboard box', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                dashboard_box_component_1.DashboardBoxComponent,
                ng2_translate_1.TranslateService,
                ng2_dragula_1.DragulaService,
                dashboardService_1.DashboardService,
                ng2_translate_1.TranslateLoader
            ].concat(crudProviders_1.CRUD_PROVIDERS, [
                grid_service_1.GridService,
                sidebarService_1.SidebarService,
                { provide: router_1.Router, useClass: MockLocation },
                { provide: common_1.Location, useClass: MockLocation },
                crud_service_1.CrudService
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined config', testing_1.inject([dashboard_box_component_1.DashboardBoxComponent], function (box) {
        expect(box.config).toBeDefined();
    }));
});
//# sourceMappingURL=dashboard_box.spec.js.map