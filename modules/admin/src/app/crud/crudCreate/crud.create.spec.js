"use strict";
var testing_1 = require('@angular/core/testing');
var crud_create_component_1 = require('./crud.create.component');
var crudProviders_1 = require('../common/crudProviders');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var MockLocation = (function () {
    function MockLocation() {
    }
    return MockLocation;
}());
;
describe('Crud Create', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crud_create_component_1.CrudCreate,
                { provide: common_1.Location, useClass: MockLocation }
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined grid options', testing_1.inject([crud_create_component_1.CrudCreate], function (crudCreate) {
        expect(crudCreate.crudService.gridOptions).toBeDefined();
    }));
    it('should be location', testing_1.inject([crud_create_component_1.CrudCreate], function (crudCreate) {
        expect(!!crudCreate.location).toEqual(true);
    }));
    it('should be columnDefs', testing_1.inject([crud_create_component_1.CrudCreate], function (crudCreate) {
        expect(crudCreate.crudService.gridOptions.hasOwnProperty('columnDefs')).toBeTruthy();
    }));
    it('should be rowData', testing_1.inject([crud_create_component_1.CrudCreate], function (crudCreate) {
        expect(crudCreate.crudService.gridOptions.hasOwnProperty('rowData')).toBeTruthy();
    }));
});
//# sourceMappingURL=crud.create.spec.js.map