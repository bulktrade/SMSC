export class LoginPage {
    elemMainContent = element(by.className('user-name'));
    usernameField = element(by.className('username'));
    elemNotFound = element(by.tagName('notfound'));
    dangerMessage = element(by.className('alert-danger'));
    details = element(by.className('details'));
    btnSubmit = element(by.id('submitButton'));

    get() {
        browser.get('/admin');
    }

    getNavigation() {
        browser.get('/navigation');
    }

    getNotFound() {
        browser.get('/noContent');
    }

    isPresentMainContent() {
        return this.elemMainContent.isPresent();
    }

    isPresentNotFound() {
        return this.elemNotFound.isPresent();
    }

    ifPresentDangerMsg() {
        return this.dangerMessage.isPresent();
    }

    clickOnBtnSend(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('btn')), 5000).then(function (el: webdriver.IWebElement) {
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
}
