"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('./common/crudProviders');
var crud_component_1 = require('./crud.component');
var http_1 = require('@angular/http');
describe('Crud', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crud_component_1.Crud
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined router', testing_1.inject([crud_component_1.Crud], function (crud) {
        expect(crud.router).toBeDefined();
    }));
});
//# sourceMappingURL=crud.spec.js.map