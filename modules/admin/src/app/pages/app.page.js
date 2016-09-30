"use strict";
var AppTest = (function () {
    function AppTest() {
        this.elemUsername = element(by.className('username'));
        this.elemPassword = element(by.className('password'));
    }
    AppTest.prototype.get = function () {
        browser.get('/admin');
    };
    AppTest.prototype.isPresentUsername = function () {
        return this.elemUsername.isPresent();
    };
    AppTest.prototype.isPresentPassword = function () {
        return this.elemPassword.isPresent();
    };
    return AppTest;
}());
exports.AppTest = AppTest;
//# sourceMappingURL=app.page.js.map