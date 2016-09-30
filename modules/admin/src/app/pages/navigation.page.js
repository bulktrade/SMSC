"use strict";
var login_page_1 = require('./login.page');
var NavigationTest = (function () {
    function NavigationTest() {
        this.login = new login_page_1.LoginPage();
        this.dashboardTitle = element(by.className('dashboard-item'));
        this.dashboardItem = element(by.className('dashboard'));
        this.sidebarDirective = element(by.tagName('sidebar'));
        this.dashboard = element(by.css('dashboard .wrap-breadcrumb'));
        this.customers = element(by.css('customers .wrap-breadcrumb'));
    }
    NavigationTest.prototype.get = function () {
        browser.get('/admin');
    };
    NavigationTest.prototype.getTitle = function () {
        return browser.getTitle();
    };
    NavigationTest.prototype.getLanguage = function () {
        var result, userLang = 'en';
        switch (userLang) {
            case 'en':
                result = 'Dashboard';
                break;
            case 'ru':
                result = 'Приборная панель';
                break;
            case 'de':
                result = 'Armaturenbrett';
                break;
            default:
                result = 'Dashboard';
                break;
        }
        return result;
    };
    NavigationTest.prototype.getDashboardText = function () {
        return this.dashboardTitle.getText();
    };
    NavigationTest.prototype.hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };
    ;
    NavigationTest.prototype.clickOnItemNavDashboard = function (ptor) {
        return new Promise(function (resolve, reject) {
            ptor.wait(protractor.until.elementLocated(by.className('dashboard')), 5000)
                .then(function (el) {
                resolve(el.click());
            }).thenCatch(function (errback) {
                reject(errback);
            });
        });
    };
    NavigationTest.prototype.getDashboard = function () {
        return this.dashboard.isPresent();
    };
    NavigationTest.prototype.isPresentNavDirective = function () {
        return this.sidebarDirective.isPresent();
    };
    NavigationTest.prototype.clickOnItemNavCustomers = function (ptor) {
        return new Promise(function (resolve, reject) {
            ptor.wait(protractor.until.elementLocated(by.className('customers')), 5000)
                .then(function (el) {
                resolve(el.click());
            }).thenCatch(function (errback) {
                reject(errback);
            });
        });
    };
    NavigationTest.prototype.getCustomers = function () {
        return this.customers.isPresent();
    };
    return NavigationTest;
}());
exports.NavigationTest = NavigationTest;
//# sourceMappingURL=navigation.page.js.map