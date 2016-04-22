export class LoginTest {
    elemMainContent  = element(by.className('user-name'));
    elemNotFound  = element(by.tagName('notfound'));
    dangerMessage = element(by.className('alert-danger'));
    details = element(by.className('details'));

    get() {
        browser.get('/');
    }

    getNavigation() {
        browser.get('/navigation');
    }

    getNotFound() {
        browser.get('/testloginpage');
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
            ptor.wait(protractor.until.elementLocated(by.className('btn')), 5000).then(function (el:webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    waitUntilReady(elm, ptor) {
        ptor.wait(function () {
            return elm.isPresent();
        },10000);
        ptor.wait(function () {
            return elm.isDisplayed();
        },10000);
    };
}