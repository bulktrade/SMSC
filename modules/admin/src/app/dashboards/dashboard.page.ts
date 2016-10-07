import { browser } from 'protractor/built/index';
import { LoginPage } from '../login/login.page';

export class Dashboard {
    public dashboard = element(by.css('.dashboard'));
    public prot = protractor.wrapDriver(browser.driver);
    public login: LoginPage = new LoginPage();

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getTitle() {
        return browser.getTitle();
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
    clickOnFullscreenIcon(): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.clickBySelector('.box:first-child .fullscreen-icon')
                .then((el: webdriver.IWebElement) => {
                    that.clickBySelector('.box:first-child .fullscreen-icon');
                });
        });
    }

    /**
     * Click on crud icon(open it) and edit form
     * @param ptor
     * @returns {Promise}
     */
    editBox(): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.clickOnCrudIcon().then(() => {
                that.clickBySelector('.box:first-child .crud .edit').then(() => {
                    that.fillForm().then(() => {
                        resolve(true);
                    });
                });
            });
        });
    }

    /**
     * Click on size buttons
     * @param prot
     */
    clickOnSizeButtons() {
        this.clickOnCrudIcon();

        element.all(by.css('.box:first-child .view-width button:last-child'))
            .each((element, i) => {
                element.click();
                browser.sleep(700);
            });

        this.clickOnCloseIcon();
    }

    /*dragAndDrop() {
     this.prot.wait(protractor.until.elementLocated(by.css('.box:first-child')), 5000)
     .then((el) => {
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
     */
    fillForm(): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.prot.wait(protractor.until.elementLocated(by.tagName('dynamic-form')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    //  Select "type"
                    that.selectLinkset('.type #add').then(() => {
                        //  Select "description"
                        that.selectLinkset('.dashboard #add').then(() => {
                            that.inputText('NAME', 'My box name').then(() => {
                                //  Enter Description field
                                that.inputText('DESCRIPTION', 'Box description').then(() => {
                                    //  Enter order field
                                    that.inputText('ORDER', '0').then(() => {
                                        //  Select width option
                                        that.clickSelectOption('.width select', 2).then(() => {
                                            //  Select height option
                                            that.clickSelectOption('.height select', 2)
                                                .then(() => {
                                                    //  Save
                                                    that.clickBySelector('#modify').then(() => {
                                                        //  Close
                                                        that.clickBySelector('.back.md-primary')
                                                            .then(() => {
                                                                resolve(true);
                                                            });
                                                    });
                                                });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }).thenCatch((error) => {
                throw error;
            });
        });
    }

    /**
     * Enter text to input field
     * @param prot
     * @param inputName
     * @param text
     */
    inputText(inputName, text: string): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.prot.wait(protractor.until.elementLocated(by.name(inputName)), 5000)
                .then((el: webdriver.IWebElement) => {
                    el.clear();
                    el.sendKeys(text);
                    resolve(true);
                });
        });
    }

    /**
     * Click on linkset
     * @param prot
     * @param selector
     */
    selectLinkset(selector): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.clickBySelector(selector).then(() => {
                that.clickBySelector('.ag-body-container > div:first-child ' +
                    '.ag-selection-checkbox img:nth-child(2)').then(() => {
                    that.clickBySelector('#addLink').then(() => {
                        that.prot.wait(protractor.until.elementLocated(
                            by.tagName('dynamic-form')), 5000).then(() => {
                            resolve(true);
                        });
                    });
                });
            });
        });

        /*return new Promise((resolve) => {
         that.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000)
         .then((el: webdriver.IWebElement) => {
         that.clickBySelector(selector, 1000).then(() => {
         selector = '.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)';
         that.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000)
         .then((el: webdriver.IWebElement) => {
         that.clickBySelector(selector).then(() => {
         /!*selector = '#addLink';
         that.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000)
         .then((el: webdriver.IWebElement) => {
         that.clickBySelector(selector).then(() => {
         resolve(true);
         });
         });*!/
         });
         });
         });
         });
         });*/
    }

    /**
     * Click "option"
     *
     * @param prot
     * @param selector - selector to "select" tag
     * @param num - option index
     */
    clickSelectOption(selector, num): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.clickBySelector(selector).then(() => {
                selector += ' option:nth-child(' + num + ')';
                that.prot.wait(protractor.until.elementLocated(by.tagName('dynamic-form')), 5000)
                    .then(() => {
                        that.clickBySelector(selector).then(() => {
                            resolve(true);
                        });
                    });
            });
        });
    };

    /**
     * Click element by selector
     * @param prot
     * @param selector
     */
    clickBySelector(selector: string, delay?: number): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000)
                .then((el: webdriver.IWebElement) => {
                    resolve(el.click());

                    if (delay !== undefined && delay > 100) {
                        // browser.sleep(delay);
                    }
                });
        }).catch((error) => {
            throw error;
        });
    }

    /**
     * Create box
     * @returns {Promise<T>}
     */
    createBox(): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.clickBySelector('#dashboard div.add.toolButton').then(() => {
                that.fillForm().then(() => {
                    resolve(true);
                });
            });
        });
    }

    /**
     * Remove box
     */
    removeBox(): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.clickBySelector('.box:first-child .crud .icon').then(() => {
                browser.sleep(1000);
                that.clickBySelector('.box:first-child .crud .remove').then(() => {
                    browser.sleep(1000);
                    resolve(true);
                });
            });
        });
    }

    /**
     * Click on close crud box tool
     * @returns {Promise}
     */
    toggleCloseIcon() {
        let that = this;

        that.clickOnCrudIcon().then(() => {
            browser.sleep(1000);
            that.clickOnCloseIcon().then(() => {
                browser.sleep(1000);
            });
        });
    }

    /**
     * Click on crud icon
     */
    clickOnCrudIcon(): Promise<Object> {
        let that = this;

        return new Promise((resolve) => {
            that.clickBySelector('.box:first-child .crud .icon').then(() => {
                resolve(true);
            });
        });
    }

    /**
     * Click on close icon
     */
    clickOnCloseIcon(): Promise<Object> {
        return new Promise((resolve) => {
            this.clickBySelector('.box:first-child .closeTool .material-icons').then(() => {
                resolve(true);
            });
        });
    }

    finish() {
        browser.sleep(50000);
    }
}
