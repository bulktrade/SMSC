export class Login {

    login() {
        let ptor = protractor.wrapDriver(browser.driver);

        ptor.wait(protractor.until.elementLocated(by.className('username')), 5000).then(function (el: webdriver.IWebElement) {
            el.sendKeys('admin');
            ptor.wait(protractor.until.elementLocated(by.className('password')), 5000).then(function (el: webdriver.IWebElement) {
                el.sendKeys('admin');
                ptor.wait(protractor.until.elementLocated(by.className('btn')), 5000).then(function (el: webdriver.IWebElement) {
                    el.submit();
                });
            });
        });
    }

}