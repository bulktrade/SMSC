"use strict";
var testing_1 = require('@angular/core/testing');
var crud_edit_component_1 = require('./crud.edit.component');
var crudProviders_1 = require('../common/crudProviders');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var MockLocation = (function () {
    function MockLocation() {
    }
    return MockLocation;
}());
;
describe('Crud Edit', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crud_edit_component_1.CrudEdit,
                { provide: common_1.Location, useClass: MockLocation }
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined grid options', testing_1.inject([crud_edit_component_1.CrudEdit], function (crudEdit) {
        expect(crudEdit.crudService.gridOptions).toBeDefined();
    }));
    it('should be location', testing_1.inject([crud_edit_component_1.CrudEdit], function (crudEdit) {
        expect(!!crudEdit.location).toEqual(true);
    }));
    it('should be columnDefs', testing_1.inject([crud_edit_component_1.CrudEdit], function (crudEdit) {
        expect(crudEdit.crudService.gridOptions.hasOwnProperty('columnDefs')).toBeTruthy();
    }));
    it('should be rowData', testing_1.inject([crud_edit_component_1.CrudEdit], function (crudEdit) {
        expect(crudEdit.crudService.gridOptions.hasOwnProperty('rowData')).toBeTruthy();
    }));
});
//# sourceMappingURL=crud.edit.spec.js.map