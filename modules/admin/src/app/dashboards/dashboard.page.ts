import { WaitUntilReady } from '../pages/common/waitUntilReady';

export class Dashboard {
    public dashboard = $('.dashboard');
    public crudIcon = $('.box:first-child .crud .icon');
    public crudEditBox = $('.crud .material-icons .edit');
    public crudRemoveBox = $('.crud .material-icons .remove');
    public closeIcon = $('.closeTool .material-icons');
    public fullscreenIcon = $('.fullscreen-icon');

    private origFn = browser.driver.controlFlow().execute;

    constructor() {
    }

    get() {
        browser.get('/');
    }

    getTitle() {
        return browser.getTitle();
    }

    login_() {
        let ptor = protractor.wrapDriver(browser.driver);

        ptor.wait(protractor.until.elementLocated(by.css('.username input')), 5000)
            .then(function (el: webdriver.IWebElement) {
                el.sendKeys('admin');
                ptor.wait(protractor.until.elementLocated(by.css('.password input')), 5000)
                    .then(function (elem: webdriver.IWebElement) {
                        elem.sendKeys('admin');
                        ptor.wait(protractor.until.elementLocated(by.id('submitButton')), 5000)
                            .then(function (element: webdriver.IWebElement) {
                                element.submit();
                            });
                    });
            });
    }

    clickOnItemNavDashboard(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('dashboardcomponent')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    getDashboard() {
        return this.dashboard.isPresent();
    }

    /**
     * Click on fullscreen
     *
     * @param ptor
     * @returns {Promise}
     */
    clickOnFullscreenIcon(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('.fullscreen-icon')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    getFullscreenIcon() {
        return this.fullscreenIcon.isPresent();
    }

    /**
     * Click on crud icon(open it)
     * @param ptor
     * @returns {Promise}
     */
    clickOnCrudIcon(prot) {
        let this_ = this;

        return new Promise((resolve, reject) => {
            //resolve($('.box:first-child .crud .icon').click());

            prot.wait(protractor.until.elementLocated(by.css('.box:first-child .crud .icon')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                    browser.sleep(1000);
                    prot.wait(protractor.until.elementLocated(by.css('.box:first-child .crud .edit')), 5000)
                        .then(function (el: webdriver.IWebElement) {
                            resolve(el.click());
                            browser.sleep(500);
                            this_.fillForm(prot);
                        })
                });
        });
    }

    getCrudIcon() {
        return this.crudIcon.isPresent();
    }

    /**
     * Close fullscreen by press Escape key
     * @param prot
     */
    pressCloseFullscreenESC(prot) {
        prot.actions().sendKeys(protractor.Key.ESCAPE).perform();
    }

    /**
     * Click on size buttons
     * @param prot
     */
    clickOnSizeButtons(prot) {
        try{
            $$('.view-width button:not(.active)').each((element, i) => {
                element.click();
            });
        } catch(ex) {
            console.log(ex);
        }
    }

    /**
     * Clink on edit icon, go to edit form
     * @param prot
     * @returns {Promise}
     */
    clickOnEditIcon(prot) {
        return new Promise((resolve) => {
            prot.wait(protractor.until.elementLocated(by.css('.box:first-child .crud .edit')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                    browser.sleep(10000);
                })
        });
    }

    getEditIcon() {
        return this.crudEditBox.isPresent();
    }

    /**
     * Fill edit/create form
     * @param prot
     */
    fillForm(prot) {
        console.log('Current URL');
        browser.getCurrentUrl().then((url) => {
            console.log(url);
        });

        //  Enter "name"
        prot.wait(protractor.until.elementLocated(by.name('NAME')), 500).then((el: webdriver.IWebElement) => {
            el.sendKeys('MyBoxName');

            //  Enter "description"
            prot.wait(protractor.until.elementLocated(by.name('DESCRIPTION')), 500).then((el: webdriver.IWebElement) => {
                el.sendKeys('Box description');

                //  Select width option
                this.clickBySelector(prot, 'md-select[ng-reflect-class-name="width"] select', 2);
                //  Select height option
                this.clickBySelector(prot, 'md-select[ng-reflect-class-name="height"] select', 2);
                browser.sleep(1000);

                //  Select "type"
                this.selectLinkset(prot, 'multiple-select[ng-reflect-class-name="type"] md-icon#add');
                browser.sleep(1000);
                //  Select "description"
                this.selectLinkset(prot, 'multiple-select[ng-reflect-class-name="dashboard"] md-icon#add');
                browser.sleep(1000);

                //  Update
                prot.wait(protractor.until.elementLocated(by.css('#modify')), 5000).then((el: webdriver.IWebElement) => {
                    el.click();
                });
                browser.sleep(1000);
                prot.wait(protractor.until.elementLocated(by.css('.back.md-primary')), 50000).then((el: webdriver.IWebElement) => {
                    el.click();
                });
                browser.sleep(10000);
            });
        });
    }

    selectLinkset(prot, selector) {
        prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
            el.click();
            browser.sleep(1000);

            prot.wait(protractor.until.elementLocated(by.css('.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)')), 5000)
                .then((el: webdriver.IWebElement) => {
                    el.click();

                    prot.wait(protractor.until.elementLocated(by.css('#addLink')), 5000).then((el: webdriver.IWebElement) => {
                        el.click();
                    }).catch((ex) => {
                        console.log('#addLink Bamiza error');
                    });
            })
        });
    }

    clickBySelector(prot, selector, num) {
        prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
            el.click();

            selector += ' option:nth-child('+ num +')';
            prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
                el.click();
            });
        });
    };

    /**
     * Click on close crud box tool
     * @param ptor
     * @returns {Promise}
     */
    clickOnCloseIcon(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('.closeTool .material-icons')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    getCloseIcon() {
        return this.closeIcon.isPresent();
    }
}
