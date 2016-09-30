"use strict";
var testing_1 = require('@angular/core/testing');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var crudProviders_1 = require('./crud/common/crudProviders');
describe('App', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                app_component_1.App,
                crudProviders_1.CRUD_PROVIDERS
            ],
            imports: [
                http_1.HttpModule
            ]
        });
    });
});
//# sourceMappingURL=app.spec.js.map