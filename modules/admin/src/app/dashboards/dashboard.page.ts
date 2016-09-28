import { browser } from "protractor/built/index";
import { LoginPage } from '../pages/login.page'

export class Dashboard {
    public dashboard = $('.dashboard');
    public prot = null;
    public login:LoginPage = new LoginPage();

    constructor() { }

    get() {
        browser.get('/');
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
        $('body').sendKeys(protractor.Key.ESCAPE);
        browser.sleep(3000);
    }

    /**
     * Click on size buttons
     * @param prot
     */
    clickOnSizeButtons() {
        this.clickOnCrudIcon();

        try {
            $$('.box:first-child .view-width button:last-child').each((element, i) => {
                element.click();
                browser.sleep(700);
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    dragAndDrop() {
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
    }

    /**
     * Fill edit/create form
     * @param prot
     */
    fillForm() {
        console.log('Current URL');
        browser.getCurrentUrl().then((url) => {
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
    }

    /**
     * Enter text to input field
     * @param prot
     * @param inputName
     * @param text
     */
    inputText(inputName, text: string) {
        this.prot.wait(protractor.until.elementLocated(by.name(inputName)), 5000).then((el: webdriver.IWebElement) => {
            el.clear();
            el.sendKeys(text);
        });
    }

    /**
     * Click on linkset
     * @param prot
     * @param selector
     */
    selectLinkset(selector) {
        this.clickBySelector(selector, 1000);
        this.clickBySelector('.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)', 1000);
        this.clickBySelector('#addLink', 1000);
    }

    /**
     * Click "option"
     *
     * @param prot
     * @param selector - selector to "select" tag
     * @param num - option index
     */
    clickSelectOption(selector, num) {
        this.clickBySelector(selector, 1000);
        selector += ' option:nth-child(' + num + ')';
        this.clickBySelector(selector, 1000);
    };

    /**
     * Click element by selector
     * @param prot
     * @param selector
     */
    clickBySelector(selector: string, delay?: number) {
        this.prot.wait(protractor.until.elementLocated(by.css(selector)), 5000).then((el: webdriver.IWebElement) => {
            el.click();

            if (delay != undefined && delay > 100) {
                browser.sleep(delay);
            }
        });
    }

    /**
     * Create box
     * @param prot
     * @returns {Promise<T>}
     */
    createBox() {
        this.clickBySelector('#dashboard div.add.toolButton', 1000);
        this.fillForm();
    }

    /**
     * Remove box
     * @param prot
     */
    removeBox() {
        this.clickOnCrudIcon();
        this.clickBySelector('.box:first-child .crud .remove', 1000);
    }

    /**
     * Click on close crud box tool
     * @param ptor
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
