"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var token_service_1 = require('../services/auth/token.service');
var AuthGuard = (function () {
    function AuthGuard(router, tokenService) {
        this.router = router;
        this.tokenService = tokenService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (!this.tokenService.isTokenExpired()) {
            return true;
        }
        this.router.navigateByUrl('/login');
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, token_service_1.TokenService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=authGuard.js.map