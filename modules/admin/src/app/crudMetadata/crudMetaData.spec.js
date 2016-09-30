"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('../crud/common/crudProviders');
var crudMetaData_components_1 = require('./crudMetaData.components');
var http_1 = require('@angular/http');
describe('CrudMetaGridData', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crudMetaData_components_1.CrudMetaData
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be translate', testing_1.inject([crudMetaData_components_1.CrudMetaData], function (crudMetaData) {
        expect(!!crudMetaData.translate).toEqual(true);
    }));
});
//# sourceMappingURL=crudMetaData.spec.js.map