"use strict";
var _this = this;
var dashboard_page_1 = require('./dashboard.page');
describe('Navigation', function () {
    var prot = protractor.wrapDriver(browser.driver);
    beforeEach(function () {
        _this.dashboard = new dashboard_page_1.Dashboard();
        _this.dashboard.get();
        prot = protractor.wrapDriver(browser.driver);
        _this.dashboard.prot = prot;
    });
    //  Sign in
    it('Try to login login', function () {
        _this.dashboard.login.login();
    });
    //  Check page title
    it('Test title', function () {
        var result = 'SMSC Admin';
        _this.dashboard.getTitle().then(function (res) {
            expect(_this.dashboard.getTitle()).toBe(result);
        });
    });
    //  Check by existing dashboard
    it('Check by existing dashboard', function () {
        _this.dashboard.clickOnItemNavDashboard(prot).then(function () {
            expect(_this.dashboard.getDashboard()).toBeTruthy();
        });
    });
    //  Drag and drop box
    it('Drag and drop box', function () {
        //this.dashboard.dragAndDrop();
    });
    //  Switch to fullscreen mode
    it('Click on fullscreen icon', function () {
        _this.dashboard.clickOnFullscreenIcon(prot);
    });
    //  Switch off fullscreen mode by press Escape key
    it('Press ESC key', function () {
        _this.dashboard.pressCloseFullscreenESC();
    });
    //  Open/Close crud box tool
    it('Open/Close crud box tool', function () {
        _this.dashboard.toggleCloseIcon();
    });
    //  Create box
    it('Create box', function () {
        _this.dashboard.createBox();
    });
    //  Open box crud tool and go to edit form
    it('Open edit form and save', function () {
        _this.dashboard.editBox();
    });
    //  Change size mode
    it('Switch height box mode', function () {
        _this.dashboard.clickOnSizeButtons();
    });
    //  Remove box
    it('Remove box', function () {
        _this.dashboard.removeBox();
    });
});
//# sourceMappingURL=dashboard.e2e.js.map