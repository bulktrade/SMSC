export class Dashboard {
    public dashboard = $('.dashboard');
    public crudIcon = $('.crud .icon');
    public fullscreenIcon = $('.fullscreen-icon');

    constructor() {
    }

    init(dashboard) {
        console.log(dashboard);
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

    clickOnCrudIcon(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('.crud .icon')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    getCrudIcon() {
        return this.crudIcon.isPresent();
    }

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
}
