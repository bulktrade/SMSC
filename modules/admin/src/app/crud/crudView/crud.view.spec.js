"use strict";
var testing_1 = require('@angular/core/testing');
var crudProviders_1 = require('../common/crudProviders');
var crud_view_component_1 = require('./crud.view.component');
var http_1 = require('@angular/http');
describe('Crud View', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                crud_view_component_1.CrudView
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined grid options', testing_1.inject([crud_view_component_1.CrudView], function (crudView) {
        expect(crudView.crudService.gridOptions).toBeDefined();
    }));
});
//# sourceMappingURL=crud.view.spec.js.map