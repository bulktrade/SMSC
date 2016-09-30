"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('../../crud/common/crudProviders');
var crudMetaFormData_component_1 = require('./crudMetaFormData.component');
var http_1 = require('@angular/http');
describe('CrudMetaFormData', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crudMetaFormData_component_1.CrudMetaFormData
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be translate', testing_1.inject([crudMetaFormData_component_1.CrudMetaFormData], function (crudMetaFormData) {
        expect(!!crudMetaFormData.translate).toEqual(true);
    }));
});
//# sourceMappingURL=crudMetaFormData.spec.js.map