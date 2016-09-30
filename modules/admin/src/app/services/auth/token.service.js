"use strict";
var angular2_jwt_1 = require('angular2-jwt');
var core_1 = require('@angular/core');
exports.AUTH_TOKEN_NAME = 'OAccessAdminToken';
var TokenService = (function () {
    function TokenService() {
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    /**
     * Get token from local storage.
     *
     * @returns {any}
     */
    TokenService.prototype.getToken = function () {
        return localStorage.getItem(exports.AUTH_TOKEN_NAME);
    };
    /**
     * Set token to local storage.
     *
     * @param token
     */
    TokenService.prototype.setToken = function (token) {
        localStorage.setItem(exports.AUTH_TOKEN_NAME, token);
    };
    /**
     * Reset token.
     */
    TokenService.prototype.resetToken = function () {
        localStorage.removeItem(exports.AUTH_TOKEN_NAME);
    };
    /**
     * Identify if the token has expired.
     *
     * @returns {boolean}
     */
    TokenService.prototype.isTokenExpired = function () {
        if (!this.getToken()) {
            return true;
        }
        return this.jwtHelper.isTokenExpired(this.getToken());
    };
    TokenService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map