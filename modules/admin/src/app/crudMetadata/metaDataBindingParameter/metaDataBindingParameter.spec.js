"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('../../crud/common/crudProviders');
var http_1 = require('@angular/http');
var metaDataBindingParameter_1 = require('./metaDataBindingParameter');
describe('MetaDataPropertyBindingParameter', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                metaDataBindingParameter_1.MetaDataPropertyBindingParameter
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be translate', testing_1.inject([metaDataBindingParameter_1.MetaDataPropertyBindingParameter], function (metaDataPropertyBindingParameter) {
        expect(!!metaDataPropertyBindingParameter.translate).toEqual(true);
    }));
});
//# sourceMappingURL=metaDataBindingParameter.spec.js.map