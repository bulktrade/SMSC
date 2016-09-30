"use strict";
var angular2_jwt_1 = require('angular2-jwt');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var token_service_1 = require('./token.service');
var configService_1 = require('../../config/configService');
var AuthService = (function () {
    function AuthService(authHttp, tokenService, configService) {
        this.authHttp = authHttp;
        this.tokenService = tokenService;
        this.configService = configService;
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.authHttp.post(_this.configService.config.orientDBUrl + '/token/' +
                _this.configService.config.orientDBDatabase, 'username=' + encodeURIComponent(username) + '&password=' +
                encodeURIComponent(password) + '&grant_type=password', { headers: headers }).subscribe(function (data) {
                _this.tokenService.setToken(data.json()['access_token']);
                resolve(_this.tokenService.getToken());
            }, function (err) {
                reject(err);
            });
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, token_service_1.TokenService, configService_1.ConfigService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map