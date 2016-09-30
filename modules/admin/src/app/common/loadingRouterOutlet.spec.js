"use strict";
var testing_1 = require('@angular/core/testing');
var loadingRouterOutlet_1 = require('./loadingRouterOutlet');
var http_1 = require('@angular/http');
var loadingGrid_service_1 = require('../services/loading/loadingGrid.service');
var crudProviders_1 = require('../crud/common/crudProviders');
var loadingRouterOutlet_service_1 = require('../services/loading/loadingRouterOutlet.service');
describe('Loading RouterOutlet', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                loadingRouterOutlet_service_1.LoadingRouterOutletService,
                loadingRouterOutlet_1.LoadingRouterOutlet,
                loadingGrid_service_1.LoadingGridService
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('loading spinner should be true', testing_1.inject([loadingRouterOutlet_1.LoadingRouterOutlet], function (loadingRouterOutlet) {
        loadingRouterOutlet.loadingService.start();
        expect(loadingRouterOutlet.loadingService.loading).toBeTruthy();
    }));
    it('loading spinner should be false', testing_1.inject([loadingRouterOutlet_1.LoadingRouterOutlet], function (loadingRouterOutlet) {
        loadingRouterOutlet.loadingService.stop();
        expect(loadingRouterOutlet.loadingService.loading).toBeFalsy();
    }));
});
//# sourceMappingURL=loadingRouterOutlet.spec.js.map