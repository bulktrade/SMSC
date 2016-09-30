"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('../common/crudProviders');
var http_1 = require('@angular/http');
var crud_linkset_component_1 = require('./crud.linkset.component');
var common_1 = require('@angular/common');
var grid_service_1 = require('../../services/grid.service');
var MockLocation = (function () {
    function MockLocation() {
    }
    return MockLocation;
}());
;
describe('Crud Linkset', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crud_linkset_component_1.CrudLinkset,
                grid_service_1.GridService,
                { provide: common_1.Location, useClass: MockLocation }
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined grid options', testing_1.inject([crud_linkset_component_1.CrudLinkset], function (crudLinkset) {
        expect(crudLinkset.crudService.gridOptions).toBeDefined();
    }));
});
//# sourceMappingURL=crud.linkset.spec.js.map