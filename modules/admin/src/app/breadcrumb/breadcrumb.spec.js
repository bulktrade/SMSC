"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var breadcrumb_component_1 = require('./breadcrumb.component');
var breadcrumb_service_1 = require('./breadcrumb.service');
var router_1 = require('@angular/router');
var crudProviders_1 = require('../crud/common/crudProviders');
describe('Breadcrumb', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                crudProviders_1.CRUD_PROVIDERS,
                breadcrumb_component_1.Breadcrumb,
                breadcrumb_service_1.BreadcrumbService
            ],
            imports: [
                http_1.HttpModule,
                router_1.RouterModule
            ]
        });
    });
    it('loading spinner should be true', testing_1.inject([breadcrumb_component_1.Breadcrumb], function (breadcrumb) {
        expect(!!breadcrumb.translate).toEqual(true);
    }));
});
//# sourceMappingURL=breadcrumb.spec.js.map