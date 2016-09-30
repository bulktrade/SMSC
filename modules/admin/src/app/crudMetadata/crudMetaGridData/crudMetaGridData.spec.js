"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('../../crud/common/crudProviders');
var crudMetaGridData_component_1 = require('./crudMetaGridData.component');
var http_1 = require('@angular/http');
describe('CrudMetaGridData', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crudMetaGridData_component_1.CrudMetaGridData
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be translate', testing_1.inject([crudMetaGridData_component_1.CrudMetaGridData], function (crudMetaGridData) {
        expect(!!crudMetaGridData.translate).toEqual(true);
    }));
});
//# sourceMappingURL=crudMetaGridData.spec.js.map