"use strict";
var login_page_1 = require('../pages/login.page');
var waitUntilReady_1 = require('../pages/common/waitUntilReady');
describe('Login page', function () {
    var ptor = protractor.wrapDriver(browser.driver);
    var loginPage = new login_page_1.LoginPage();
    beforeEach(function () {
        ptor = protractor.wrapDriver(browser.driver);
        loginPage.ptor = ptor;
    });
    it('validation for empty fields', function () {
        loginPage.get();
        waitUntilReady_1.WaitUntilReady.waitUntilReady(loginPage.btnSubmit, ptor);
        expect(loginPage.btnSubmit.isEnabled()).toBeFalsy();
    });
    it('show navigation content', function () {
        loginPage.getCustomers();
        expect(loginPage.isPresentUsernameField()).toBeTruthy();
    });
    it('is exist page 404 not found', function () {
        loginPage.getNotFound();
        expect(loginPage.isPresentNotFound).toBeTruthy();
    });
    it('responsive navigation', function () {
        var width = 330, height = 1300;
        ptor.manage().window().setSize(width, height);
        waitUntilReady_1.WaitUntilReady.waitUntilReady(loginPage.details, ptor);
        loginPage.details.getCssValue('text-align')
            .then(function (value) {
            expect(value).toEqual('center');
        });
    });
});
//# sourceMappingURL=login.e2e.js.map