"use strict";
var index_1 = require("protractor/built/index");
var login_page_1 = require('../pages/login.page');
var Dashboard = (function () {
    function Dashboard() {
        this.dashboard = element(by.css('.dashboard'));
        this.prot = null;
        this.login = new login_page_1.LoginPage();
    }
    Dashboard.prototype.get = function () {
        index_1.browser.get('/');
    };
    Dashboard.prototype.getTitle = function () {
        return index_1.browser.getTitle();
    };
    Dashboard.prototype.clickOnItemNavDashboard = function (ptor) {
        return new Promise(function (resolve, reject) {
            ptor.wait(protractor.until.elementLocated(by.className('dashboardcomponent')), 5000)
                .then(function (el) {
                resolve(el.click());
            }).thenCatch(function (errback) {
                reject(errback);
            });
        });
    };
    Dashboard.prototype.getDashboard = function () {
        return this.dashboard.isPresent();
    };
    /**
     * Click on fullscreen
     *
     * @param ptor
     * @returns {Promise}
     */
    Dashboard.prototype.clickOnFullscreenIcon = function () {
        this.clickBySelector('.box .fullscreen-icon');
    };
    /**
     * Click on crud icon(open it) and edit form
     * @param ptor
     * @returns {Promise}
     */
    Dashboard.prototype.editBox = function () {
        this.clickOnCrudIcon();
        this.clickBySelector('.box:first-child .crud .edit');
        this.fillForm();
    };
    /**
     * Close fullscreen by press Escape key
     * @param prot
     */
    Dashboard.prototype.pressCloseFullscreenESC = function () {
        element(by.css('body')).sendKeys(protractor.Key.ESCAPE);
        index_1.browser.sleep(3000);
    };
    /**
     * Click on size buttons
     * @param prot
     */
    Dashboard.prototype.clickOnSizeButtons = function () {
        this.clickOnCrudIcon();
        try {
            element.all(by.css('.box:first-child .view-width button:last-child')).each(function (element, i) {
                element.click();
                index_1.browser.sleep(700);
            });
        }
        catch (ex) {
            console.log(ex);
        }
    };
    /*dragAndDrop() {
        this.prot.wait(protractor.until.elementLocated(by.css('.box:first-child')), 5000).then((el) => {
            el.getLocation().then((location) => {
                this.prot.manage().window().getSize().then((size) => {
                    console.log(size);
                    let targetPosition = {
                        x: size.width-20,
                        y: location.y
                    }

                    console.log(targetPosition);
                    console.log(location);

                    browser.actions().mouseDown(el).perform();
                    browser.actions().mouseMove(targetPosition).perform();
                    browser.actions().mouseUp().perform();

                    browser.sleep(1000);
                });
            });
        });
    }*/
    /**
     * Fill edit/create form
     * @param prot
     */
    Dashboard.prototype.fillForm = function () {
        console.log('Current URL');
        index_1.browser.getCurrentUrl().then(function (url) {
            console.log(url);
        });
        //  Enter Name field
        this.inputText('NAME', 'My box name');
        //  Enter Description field
        this.inputText('DESCRIPTION', 'Box description');
        //  Enter order field
        this.inputText('ORDER', '0');
        //  Select width option
        this.clickSelectOption('md-select[ng-reflect-class-name="width"] select', 2);
        //  Select height option
        this.clickSelectOption('md-select[ng-reflect-class-name="height"] select', 2);
        //  Select "type"
        this.selectLinkset('multiple-select[ng-reflect-class-name="type"] md-icon#add');
        //  Select "description"
        this.selectLinkset('multiple-select[ng-reflect-class-name="dashboard"] md-icon#add');
        //  Update
        this.clickBySelector('#modify', 1000);
        this.clickBySelector('.back.md-primary', 1000);
    };
    /**
     * Enter text to input field
     * @param prot
     * @param inputName
     * @param text
     */
    Dashboard.prototype.inputText = function (inputName, text) {
        this.prot.wait(protractor.until.elementLocated(by.name(inputName)), 5000).then(function (el) {
            el.clear();
            el.sendKeys(text);
        });
    };
    /**
     * Click on linkset
     * @param prot
     * @param selector
     */
    Dashboard.prototype.selectLinkset = function (selector) {
        this.clickBySelector(selector, 1000);
        this.clickBySelector('.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)', 1000);
        this.clickBySelector('#addLink', 1000);
    };
    /**
     * Click "option"
     *
     * @param prot
     * @param selector - selector to "select" tag
     * @param num - option index
     */
    Dashboard.prototype.clickSelectOption = function (selector, num) {
        this.clickBySelector(selector, 1000);
        selector += ' option:nth-child(' + num + ')';
        this.clickBySelector(selector, 1000);
    };
    ;
    /**
     * Click element by selector
     * @param prot
     * @param selector
     */
    Dashboard.prototype.clickBySelector = function (selector, delay) {
        this.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then(function (el) {
            el.click();
            if (delay != undefined && delay > 100) {
                index_1.browser.sleep(delay);
            }
        });
    };
    /**
     * Create box
     * @param prot
     * @returns {Promise<T>}
     */
    Dashboard.prototype.createBox = function () {
        this.clickBySelector('#dashboard div.add.toolButton', 1000);
        this.fillForm();
    };
    /**
     * Remove box
     * @param prot
     */
    Dashboard.prototype.removeBox = function () {
        this.clickOnCrudIcon();
        this.clickBySelector('.box:first-child .crud .remove', 1000);
    };
    /**
     * Click on close crud box tool
     * @param ptor
     * @returns {Promise}
     */
    Dashboard.prototype.toggleCloseIcon = function () {
        this.clickOnCrudIcon();
        this.clickOnCloseIcon();
    };
    /**
     * Click on crud icon
     */
    Dashboard.prototype.clickOnCrudIcon = function () {
        this.clickBySelector('.box:first-child .crud .icon', 1000);
    };
    /**
     * Click on close icon
     */
    Dashboard.prototype.clickOnCloseIcon = function () {
        this.clickBySelector('.box:first-child .closeTool .material-icons', 1000);
    };
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.page.js.map