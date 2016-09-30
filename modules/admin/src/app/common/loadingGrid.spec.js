"use strict";
var testing_1 = require('@angular/core/testing');
var loadingGrid_1 = require('./loadingGrid');
var crudProviders_1 = require('../crud/common/crudProviders');
var http_1 = require('@angular/http');
describe('Loading Grid', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                loadingGrid_1.LoadingGrid
            ].concat(crudProviders_1.CRUD_PROVIDERS),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('loading spinner should be true', testing_1.inject([loadingGrid_1.LoadingGrid], function (loadingGrid) {
        loadingGrid.service.start();
        expect(loadingGrid.service.loading).toBeTruthy();
    }));
    it('loading spinner should be false', testing_1.inject([loadingGrid_1.LoadingGrid], function (loadingGrid) {
        loadingGrid.service.stop();
        expect(loadingGrid.service.loading).toBeFalsy();
    }));
});
//# sourceMappingURL=loadingGrid.spec.js.map