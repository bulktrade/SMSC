"use strict";
var _this = this;
var navigation_page_1 = require('../pages/navigation.page');
var waitUntilReady_1 = require('../pages/common/waitUntilReady');
describe('Navigation', function () {
    var ptor = protractor.wrapDriver(browser.driver);
    beforeEach(function () {
        _this.navigator = new navigation_page_1.NavigationTest();
        ptor = protractor.wrapDriver(browser.driver);
    });
    it('should have a title', function () {
        _this.navigator.get();
        var result = 'SMSC Admin';
        expect(_this.navigator.getTitle()).toBe(result);
    });
    it('login', function () {
        _this.navigator.login.login();
        expect(true).toBeTruthy();
    });
    it('should have dashboard', function () {
        _this.navigator.clickOnItemNavDashboard(ptor).then(function () {
            expect(_this.navigator.getDashboard()).toBeTruthy();
        });
    });
    it('AngularJS Translations', function () {
        var lang = _this.navigator.getLanguage();
        waitUntilReady_1.WaitUntilReady.waitUntilReady(_this.navigator.dashboardTitle, ptor);
        _this.navigator.getDashboardText()
            .then(function (text) {
            expect(lang).toEqual(text);
        });
    });
    it('marked sub and main item navigation like active', function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(_this.navigator.dashboardItem, ptor);
        _this.navigator.hasClass(_this.navigator.dashboardItem, 'active').then(function (data) {
            expect(data).toBeTruthy();
        });
    });
    it('should have navigation directive', function () {
        expect(_this.navigator.isPresentNavDirective()).toBeTruthy();
    });
    it('should have customers', function () {
        _this.navigator.clickOnItemNavCustomers(ptor).then(function () {
            expect(_this.navigator.getCustomers()).toBeTruthy();
        });
    });
    it('responsive navigation', function () {
        var width = 900, height = 1300;
        ptor.manage().window().setSize(width, height);
        _this.navigator.sidebarDirective.getCssValue('width')
            .then(function (value) {
            expect(value).toEqual('auto');
        });
    });
});
//# sourceMappingURL=navigation.e2e.js.map