import { browser } from "protractor/built/index";
import WebElement = webdriver.WebElement;
import { EC } from "../common/expectedConditions";
import {LoginPage} from "../login/login.page";

export class Dashboard {
    public dashboard = element(by.css('.dashboard'));
    public prot = protractor.wrapDriver(browser.driver);
    public login: LoginPage = new LoginPage();

    public createBoxIcon = element(by.css('#dashboard div.add.toolButton'));
    public dynamicForm_addType = element(by.tagName('.type #add'));

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getTitle() {
        return browser.getTitle();
    }

    /**
     *
     * @param ptor - protractor
     * @returns {Promise<T>|Promise}
     */
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
     */
    clickOnFullscreenIcon() {
        this.clickBySelector('.box:first-child .fullscreen-icon');
        this.clickBySelector('.box:first-child .fullscreen-icon');
    }

    /**
     * Click on crud icon(open it) and edit form
     */
    editBox() {
        this.clickOnCrudIcon();
        this.clickBySelector('.box:first-child .crud .edit');
        this.fillForm();
    }

    /**
     * Create box
     */
    createBox() {
        browser.wait(EC.presenceOf(this.createBoxIcon), 5000);
        this.createBoxIcon.click();
        this.fillForm();
    }

    /**
     * Click on size buttons
     */
    clickOnSizeButtons() {
        this.clickOnCrudIcon();

        element.all(by.css('.box:first-child .view-width button:last-child')).each((element) => {
            browser.wait(EC.presenceOf(element), 5000);
            element.click();
            browser.sleep(700);
        });

        this.clickOnCloseIcon();
    }

    /**
     * Fill edit/create form
     */
    fillForm() {
        let el = element(by.css('dynamic-form'));
        browser.wait(EC.presenceOf(el), 5000);

        this.clickSelectOption('.width select', 2);
        this.clickSelectOption('.height select', 2);
        this.selectLinkset('.type #add');
        //this.selectLinkset('.dashboard #add');
        this.inputText('NAME', 'My box name');
        this.inputText('DESCRIPTION', 'Box description');
        this.inputText('ORDER', '0');
        this.clickBySelector('#modify');
        this.clickBySelector('.back.md-primary');
    }

    /**
     * Enter text to input field
     *
     * @param inputName
     * @param text
     */
    inputText(inputName, text: string) {
        let el = element(by.name(inputName));
        browser.wait(EC.presenceOf(el), 5000);
        el.clear();
        el.sendKeys(text);
    }

    /**
     * Click on linkset
     * @param selector - selector to likset icon
     */
    selectLinkset(selector) {
        this.clickBySelector(selector);
        this.clickBySelector('.ag-body-container > div:first-child .ag-selection-checkbox img:nth-child(2)');
        this.clickBySelector('#addLink');
    }

    /**
     * Click "option"
     *
     * @param selector - selector to "select" tag
     * @param num - option index
     */
    clickSelectOption(selector, num) {
        this.clickBySelector(selector);
        selector += ' option:nth-child(' + num + ')';
        this.clickBySelector(selector);
    };

    /**
     * Click element by selector
     *
     * @param selector
     */
    clickBySelector(selector: string) {
        let el = element(by.css(selector));
        browser.wait(EC.presenceOf(el), 5000);
        el.click();
    }

    /**
     * Remove box
     */
    removeBox() {
        this.clickBySelector('.box:first-child .crud .icon');
        this.clickBySelector('.box:first-child .crud .remove');
    }

    /**
     * Click on close crud box tool
     */
    toggleCloseIcon() {
        this.clickOnCrudIcon();
        browser.sleep(700);
        this.clickOnCloseIcon();
    }

    /**
     * Click on crud icon
     */
    clickOnCrudIcon() {
        this.clickBySelector('.box:first-child .crud .icon');
    }

    /**
     * Click on close icon
     */
    clickOnCloseIcon(): Promise<Object> {
        return new Promise((resolve) => {
            this.clickBySelector('.box:first-child .closeTool .material-icons');
        });
    }
}
