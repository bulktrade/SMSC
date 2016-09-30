"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var crudProviders_1 = require('../../crud/common/crudProviders');
var auth_service_1 = require('./auth.service');
var login_model_1 = require('../../login/login.model');
var app_module_1 = require('../../app.module');
describe('Auth service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat(app_module_1.APP_PROVIDERS, [
                auth_service_1.AuthService,
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
                {
                    provide: http_1.Http, useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }, deps: [testing_2.MockBackend, http_1.BaseRequestOptions]
                }
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be defined response of the open', testing_1.inject([testing_2.MockBackend, auth_service_1.AuthService], function (backend, service) {
        var path = '/orientdb/token/smsc';
        var model = new login_model_1.LoginModel('test', '12t', false);
        backend.connections.subscribe(function (c) {
            expect(c.request.url).toEqual(path);
            var response = new http_1.ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new http_1.Response(response));
        });
        service.login(model.username, model.password)
            .then(function (res) {
            expect(res).toBeDefined();
        }, function (error) {
            expect(error).toBeDefined();
        });
    }));
});
//# sourceMappingURL=auth.service.spec.js.map