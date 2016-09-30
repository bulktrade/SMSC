"use strict";
var _this = this;
var app_page_1 = require('./pages/app.page');
var waitUntilReady_1 = require('./pages/common/waitUntilReady');
describe('App', function () {
    var ptor = protractor.wrapDriver(browser.driver);
    beforeEach(function () {
        _this.apptest = new app_page_1.AppTest();
        ptor = protractor.wrapDriver(browser.driver);
    });
    it('should have a title', function () {
        _this.apptest.get();
        var subject = browser.getTitle();
        var result = 'SMSC Admin';
        expect(subject).toEqual(result);
    });
    it('should have input username', function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(_this.apptest.elemUsername, ptor);
        var result = true;
        expect(_this.apptest.isPresentUsername()).toEqual(result);
    });
    it('should have input password', function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(_this.apptest.elemPassword, ptor);
        var result = true;
        expect(_this.apptest.isPresentPassword()).toEqual(result);
    });
});
//# sourceMappingURL=app.e2e.js.map