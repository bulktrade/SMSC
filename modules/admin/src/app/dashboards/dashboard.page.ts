import { browser } from "protractor/built/index";
import { LoginPage } from "../pages/login.page";

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
    fillForm() {
        this.prot.wait(protractor.until.elementLocated(by.tagName('dynamic-form')), 5000)
            .then(function (el: webdriver.IWebElement) {
                //  Enter Name field
                this.inputText('NAME', 'My box name').then(() => {
                    //  Enter Description field
                    this.inputText('DESCRIPTION', 'Box description').then(() => {
                        //  Enter order field
                        this.inputText('ORDER', '0').then(() => {
                            //  Select width option
                            this.clickSelectOption('*[ng-reflect-class-name="width"] select', 2).then(() => {
                                //  Select height option
                                this.clickSelectOption('*[ng-reflect-class-name="height"] select', 2).then(() => {
                                    //  Select "type"
                                    this.selectLinkset('*[ng-reflect-class-name="type"] #add').then(() => {
                                        //  Select "description"
                                        this.selectLinkset('*[ng-reflect-class-name="dashboard"] #add').then(() => {
                                            //  Update
                                            this.clickBySelector('#modify').then(() => {
                                                //  Back
                                                this.clickBySelector('.back.md-primary').then(() => {
                                                    return true;
                                                })
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            })
            .thenCatch((error) => {
                throw error; // @todo check for better solution.
            });
    }

    /**
     * Enter text to input field
     * @param prot
     * @param inputName
     * @param text
     */
    inputText(inputName, text: string): Promise<Object> {
        return new Promise((resolve) => {
            this.prot.wait(protractor.until.elementLocated(by.name(inputName)), 5000).then((el: webdriver.IWebElement) => {
                el.clear();
                resolve(el.sendKeys(text));
            });
        });
    }

    /**
     * Click on linkset
     * @param prot
     * @param selector
     */
    selectLinkset(selector): Promise<Object> {
        return new Promise((resolve) => {
            this.clickBySelector(selector).then(() => {
                this.clickBySelector('.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)').then(() => {
                    this.clickBySelector('#addLink').then(() => {
                        resolve(true);
                    });
                });
            });
        });
    }

    /**
     * Click "option"
     *
     * @param prot
     * @param selector - selector to "select" tag
     * @param num - option index
     */
    clickSelectOption(selector, num): Promise<Object> {
        return new Promise((resolve) => {
            this.clickBySelector(selector).then(() => {
                selector += ' option:nth-child(' + num + ')';
                this.clickBySelector(selector).then(() => {
                    resolve(true);
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
        return new Promise((resolve) => {
            this.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
                el.click();

                if (delay != undefined && delay > 100) {
                    browser.sleep(delay);
                }

                //  @todo fix - return click value
                resolve(true);
            });
        });
    }

    /**
     * Create box
     * @returns {Promise<T>}
     */
    createBox() {
        this.clickBySelector('#dashboard div.add.toolButton');
        this.fillForm();
    }

    /**
     * Remove box
     */
    removeBox() {
        this.clickBySelector('.box:first-child .crud .remove');
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
    clickOnCrudIcon() {
        this.clickBySelector('.box:first-child .crud .icon', 1000);
    }

    /**
     * Click on close icon
     */
    clickOnCloseIcon() {
        this.clickBySelector('.box:first-child .closeTool .material-icons', 1000);
    }
}
