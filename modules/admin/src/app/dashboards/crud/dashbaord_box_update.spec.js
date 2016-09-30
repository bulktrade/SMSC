"use strict";
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var router_1 = require("@angular/router");
var dashboard_box_update_1 = require("./dashboard_box_update");
var dashboardService_1 = require("../dashboardService");
var crudProviders_1 = require("../../crud/common/crudProviders");
var grid_service_1 = require("../../services/grid.service");
var crud_service_1 = require("../../crud/crud.service");
var MockLocation = (function () {
    function MockLocation() {
    }
    return MockLocation;
}());
;
describe('Dashboard crud update', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                dashboard_box_update_1.DashboardCrudUpdate,
                ng2_translate_1.TranslateService,
                ng2_dragula_1.DragulaService,
                dashboardService_1.DashboardService,
                ng2_translate_1.TranslateLoader
            ].concat(crudProviders_1.CRUD_PROVIDERS, [
                grid_service_1.GridService,
                { provide: router_1.Router, useClass: MockLocation },
                { provide: common_1.Location, useClass: MockLocation },
                crud_service_1.CrudService
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined resolveData', testing_1.inject([dashboard_box_update_1.DashboardCrudUpdate], function (box) {
        expect(box.resolveData).toBeDefined();
    }));
    it('should be defined btnName', testing_1.inject([dashboard_box_update_1.DashboardCrudUpdate], function (box) {
        expect(box.btnName).toBeDefined();
    }));
});
//# sourceMappingURL=dashbaord_box_update.spec.js.map