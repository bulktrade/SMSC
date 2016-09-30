"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_model_1 = require('./login.model');
var auth_service_1 = require('../services/auth/auth.service');
var Login = (function () {
    function Login(router, authService) {
        this.router = router;
        this.authService = authService;
        this.errorMessage = null;
        this.isErrorMessage = false;
        this.loading = false;
        this.model = new login_model_1.LoginModel('', '', false);
    }
    Login.prototype.ngOnInit = function () {
    };
    Login.prototype.onSubmit = function (model) {
        var _this = this;
        this.errorMessage = null;
        this.loading = true;
        this.authService.login(model.username, model.password)
            .then(function (res) {
            _this.router.navigateByUrl('/');
        })
            .catch(function (err) {
            switch (err.status) {
                case 400:
                    _this.errorMessage = 'login.userNotFound';
                    break;
                default:
                    console.log(err);
                    _this.errorMessage = 'login.commonError';
                    break;
            }
            _this.loading = false;
            _this.isErrorMessage = true;
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            providers: [
                auth_service_1.AuthService
            ],
            template: require('./login.html'),
            styleUrls: [
                require('./login.scss')
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.component.js.map