"use strict";
var testing_1 = require('@angular/core/testing');
var token_service_1 = require('./token.service');
describe('Token service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                token_service_1.TokenService
            ]
        });
    });
    it('should get a token', testing_1.inject([token_service_1.TokenService], function (service) {
        var token = 'testing token service';
        service.setToken(token);
        expect(service.getToken()).toEqual(token);
    }));
    it('should reset a token', testing_1.inject([token_service_1.TokenService], function (service) {
        var token = 'testing token service';
        service.setToken(token);
        service.resetToken();
        expect(service.isTokenExpired()).toBeTruthy();
    }));
});
//# sourceMappingURL=token.service.spec.js.map