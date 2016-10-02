import { WaitUntil } from './common/waitUntilReady';

export class LoginPage {
    public elemNotFound = element(by.tagName('notfound'));
    public dangerMessage = element(by.className('alert-danger'));
    public details = element(by.className('details'));
    public btnSubmit = element(by.id('submitButton'));
    public usernameField = element(by.className('username'));

    private _ptor;

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getCustomers() {
        browser.get(browser.baseUrl + '/customers');
    }

    getNotFound() {
        browser.get(browser.baseUrl + '/noContent');
    }

    isPresentUsernameField() {
        WaitUntil.waitUntil(this.usernameField, this._ptor);
        return this.usernameField.isPresent();
    }

    isPresentNotFound() {
        WaitUntil.waitUntil(this.elemNotFound, this._ptor);
        return this.elemNotFound.isPresent();
    }

    ifPresentDangerMsg() {
        WaitUntil.waitUntil(this.dangerMessage, this._ptor);
        return this.dangerMessage.isPresent();
    }

    clickOnBtnSend(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('btn')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    login() {
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

    // getters and setter

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}

