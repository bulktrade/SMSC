"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('../common/crudProviders');
var crud_delete_component_1 = require('./crud.delete.component');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var MockLocation = (function () {
    function MockLocation() {
    }
    return MockLocation;
}());
;
describe('Crud Delete', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crud_delete_component_1.CrudDelete,
                { provide: common_1.Location, useClass: MockLocation }
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined grid options', testing_1.inject([crud_delete_component_1.CrudDelete], function (crudDelete) {
        expect(crudDelete.crudService.gridOptions).toBeDefined();
    }));
});
//# sourceMappingURL=crud.delete.spec.js.map