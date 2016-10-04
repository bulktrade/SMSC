import { browser } from "protractor/built/index";
import { LoginPage } from "../pages/login.page";
import {WaitUntil} from "../pages/common/waitUntilReady";

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
    clickOnFullscreenIcon() {
        this.clickBySelector('.box .fullscreen-icon');
    }

    /**
     * Click on crud icon(open it) and edit form
     * @param ptor
     * @returns {Promise}
     */
    editBox() {
        this.clickOnCrudIcon();
        this.clickBySelector('.box:first-child .crud .edit');
        this.fillForm();
    }

    /**
     * Close fullscreen by press Escape key
     * @param prot
     */
    pressCloseFullscreenESC() {
        element(by.css('body')).sendKeys(protractor.Key.ESCAPE);
        browser.sleep(3000);
    }

    /**
     * Click on size buttons
     * @param prot
     */
    clickOnSizeButtons() {
        this.clickOnCrudIcon();

        try {
            element.all(by.css('.box:first-child .view-width button:last-child')).each((element, i) => {
                element.click();
                browser.sleep(700);
            });
        } catch (ex) {
            console.log(ex);
        }
    }

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
     */
    fillForm(): Promise<Object> {
        let this_ = this;

        return new Promise((resolve) => {
            this_.prot.wait(protractor.until.elementLocated(by.tagName('dynamic-form')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    //  Select "type"
                    this_.selectLinkset('.type #add').then(() => {
                        console.log('Good');
                        //  Select "description"
                        this_.selectLinkset('.dashboard #add').then(() => {
                            console.log('Good');
                            this_.inputText('NAME', 'My box name').then(() => {
                                //  Enter Description field
                                this_.inputText('DESCRIPTION', 'Box description').then(() => {
                                    //  Enter order field
                                    this_.inputText('ORDER', '0').then(() => {
                                        //  Select width option
                                        this_.clickSelectOption('*[ng-reflect-class-name="width"] select', 2).then(() => {
                                            //  Select height option
                                            this_.clickSelectOption('*[ng-reflect-class-name="height"] select', 2).then(() => {
                                                //  Save
                                                this_.clickBySelector('#modify').then(() => {
                                                    //  Close
                                                    this_.clickBySelector('.back.md-primary').then(() => {
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
        let this_ = this;

        return new Promise((resolve) => {
            this_.prot.wait(protractor.until.elementLocated(by.name(inputName)), 5000).then((el: webdriver.IWebElement) => {
                el.clear();
                el.sendKeys(text)
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
        let this_ = this;

        return new Promise((resolve) => {
            this_.clickBySelector(selector).then(() => {
                this_.clickBySelector('.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)').then(() => {
                    this_.clickBySelector('#addLink').then(() => {
                        this_.prot.wait(protractor.until.elementLocated(by.tagName('dynamic-form')), 5000).then(() => {
                            resolve(true);
                        });
                    });
                });
            });
        });

        /*return new Promise((resolve) => {
            this_.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
                this_.clickBySelector(selector, 1000).then(() => {
                    selector = '.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)';
                    this_.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
                        this_.clickBySelector(selector).then(() => {
                            /!*selector = '#addLink';
                             this_.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
                             this_.clickBySelector(selector).then(() => {
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
        let this_ = this;

        return new Promise((resolve) => {
            this_.clickBySelector(selector).then(() => {
                selector += ' option:nth-child(' + num + ')';
                this_.prot.wait(protractor.until.elementLocated(by.tagName('dynamic-form')), 5000).then(() => {
                    this_.clickBySelector(selector).then(() => {
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
        let this_ = this;

        return new Promise((resolve) => {
            this_.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
                resolve(el.click());

                if (delay != undefined && delay > 100) {
                    //browser.sleep(delay);
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
    createBox() {
        let this_ = this;

            this_.clickBySelector('#dashboard div.add.toolButton')
            this_.fillForm();

    }

    /**
     * Remove box
     */
    removeBox() {
        let this_ = this;
        //this.clickBySelector('.box:first-child .crud .remove');
        this_.clickBySelector('.box:first-child .crud .icon').then(() => {
            browser.sleep(1000);
            this_.clickBySelector('.box:first-child .crud .remove').then(() => {
                browser.sleep(1000);
            });
        });
    }

    /**
     * Click on close crud box tool
     * @returns {Promise}
     */
    toggleCloseIcon() {
        this.clickOnCrudIcon();
        this.clickOnCloseIcon();
    }

    /**
     * Click on crud icon
     */
    clickOnCrudIcon(): Promise<Object> {
        let this_ = this;

        return new Promise((resolve) => {
            this_.clickBySelector('.box:first-child .crud .icon').then(() => {
                resolve(true);
            });
        });
    }

    /**
     * Click on close icon
     */
    clickOnCloseIcon() {
        this.clickBySelector('.box:first-child .closeTool .material-icons', 1000);
    }
}
