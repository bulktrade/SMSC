"use strict";
var testing_1 = require('@angular/core/testing');
var login_component_1 = require('./login.component');
var crudProviders_1 = require('../crud/common/crudProviders');
var auth_service_1 = require('../services/auth/auth.service');
var login_model_1 = require('./login.model');
var http_1 = require('@angular/http');
describe('Authentication', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: crudProviders_1.CRUD_PROVIDERS.concat([
                login_component_1.Login,
                auth_service_1.AuthService
            ]),
            imports: [
                http_1.HttpModule
            ]
        });
    });
    it('should be model', testing_1.inject([login_component_1.Login], function (login) {
        var model = new login_model_1.LoginModel('', '', false);
        expect(login.model).toEqual(model);
    }));
    it('loading should be is false', testing_1.inject([login_component_1.Login], function (login) {
        expect(login.loading).toBeFalsy();
    }));
    it('authentication method', testing_1.inject([login_component_1.Login], function (login) {
        var model = new login_model_1.LoginModel('', '', false);
        spyOn(login, 'onSubmit');
        login.onSubmit(model);
        expect(login.onSubmit).toHaveBeenCalled();
        login.onSubmit(model);
        expect(login.onSubmit).toHaveBeenCalledWith(model);
    }));
});
//# sourceMappingURL=login.spec.js.map