"use strict";
var waitUntilReady_1 = require('./common/waitUntilReady');
var LoginPage = (function () {
    function LoginPage() {
        this.elemNotFound = element(by.tagName('notfound'));
        this.dangerMessage = element(by.className('alert-danger'));
        this.details = element(by.className('details'));
        this.btnSubmit = element(by.id('submitButton'));
        this.usernameField = element(by.className('username'));
    }
    LoginPage.prototype.get = function () {
        browser.get('/admin');
    };
    LoginPage.prototype.getCustomers = function () {
        browser.get('/admin/customers');
    };
    LoginPage.prototype.getNotFound = function () {
        browser.get('/admin/noContent');
    };
    LoginPage.prototype.isPresentUsernameField = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.usernameField, this._ptor);
        return this.usernameField.isPresent();
    };
    LoginPage.prototype.isPresentNotFound = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.elemNotFound, this._ptor);
        return this.elemNotFound.isPresent();
    };
    LoginPage.prototype.ifPresentDangerMsg = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.dangerMessage, this._ptor);
        return this.dangerMessage.isPresent();
    };
    LoginPage.prototype.clickOnBtnSend = function (ptor) {
        return new Promise(function (resolve, reject) {
            ptor.wait(protractor.until.elementLocated(by.className('btn')), 5000)
                .then(function (el) {
                resolve(el.click());
            }).thenCatch(function (errback) {
                reject(errback);
            });
        });
    };
    LoginPage.prototype.login = function () {
        var ptor = protractor.wrapDriver(browser.driver);
        ptor.wait(protractor.until.elementLocated(by.css('.username input')), 5000)
            .then(function (el) {
            el.sendKeys('admin');
            ptor.wait(protractor.until.elementLocated(by.css('.password input')), 5000)
                .then(function (elem) {
                elem.sendKeys('admin');
                ptor.wait(protractor.until.elementLocated(by.id('submitButton')), 5000)
                    .then(function (element) {
                    element.submit();
                });
            });
        });
    };
    Object.defineProperty(LoginPage.prototype, "ptor", {
        // getters and setter
        get: function () {
            return this._ptor;
        },
        set: function (value) {
            this._ptor = value;
        },
        enumerable: true,
        configurable: true
    });
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.page.js.map