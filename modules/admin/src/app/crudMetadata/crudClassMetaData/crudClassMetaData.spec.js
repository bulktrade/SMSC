"use strict";
var testing_1 = require('@angular/core/testing');
var crudClassMetaData_component_1 = require('./crudClassMetaData.component');
var crudProviders_1 = require('../../crud/common/crudProviders');
var http_1 = require('@angular/http');
describe('CrudClassMetaData', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crudClassMetaData_component_1.CrudClassMetaData
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be translate', testing_1.inject([crudClassMetaData_component_1.CrudClassMetaData], function (crudClassMetaData) {
        expect(!!crudClassMetaData.translate).toEqual(true);
    }));
});
//# sourceMappingURL=crudClassMetaData.spec.js.map