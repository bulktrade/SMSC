import {Login} from './Login';

export class NavigationTest {
    public login;

    constructor(){
        this.login = new Login();
    }

    dashboard = element(by.className('dashboard-item'));
    dashSubMenu = element(by.className('dashboard-submenu'));
    firstNav = element(by.css('.dashboard-item-nav .dashboard-icon'));
    lastNav = element(by.css('.settings-item-nav .setting-icon'));
    titleDash = element(by.className('dashboard'));
    titleDlrtraffic = element(by.className('dlrtraffic'));
    navigation = element(by.className('side-bar'));
    smstraffic = element(by.tagName('smstraffic'));
    dlrtraffic = element(by.tagName('dlrtraffic'));
    finances = element(by.tagName('finances'));
    customers = element(by.tagName('customers'));
    monitoring = element(by.tagName('monitoring'));
    carriers = element(by.tagName('carriers'));
    routing = element(by.tagName('routing'));
    prices = element(by.tagName('prices'));
    mccmnc = element(by.tagName('mccmnc'));
    smpp = element(by.tagName('smpp'));
    api = element(by.tagName('api'));
    systemsettings = element(by.tagName('systemsettings'));

    getRoot() {
        browser.get('/');
    }

    getTitle() {
        return browser.getTitle();
    }

    getLanguage() {
        let result,
            userLang = 'en';

        switch (userLang) {
            case 'en':
                result = 'Dashboard';
                break;
            case 'ru':
                result = 'Приборная панель';
                break;
            case 'de':
                result = 'Armaturenbrett';
                break;
            default:
                result = 'Dashboard';
                break;
        }

        return result;
    }

    getDashboardText() {
        return this.dashboard.getText();
    }

    hasClass (element, cls) {
        return element.getAttribute('class').then((classes) => {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    waitUntilReady(elm, ptor) {
        ptor.wait(function () {
            return elm.isPresent();
        },10000);
        ptor.wait(function () {
            return elm.isDisplayed();
        },10000);
    };

    clickOnItemNavSmstraffic(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('dashboard')), 5000).then(function (el: webdriver.IWebElement) {
                el.click();
                ptor.wait(protractor.until.elementLocated(by.className('smstraffic')), 5000).then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                    reject(errback);
                });
            });
        });
    }
    getSmstraffic() {
        return this.smstraffic.isPresent();
    }

    clickOnItemNavDlrtraffic(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('dlrtraffic')), 5000).then(function (el:webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getDlrtraffic() {
        return this.dlrtraffic.isPresent();
    }

    clickOnItemNavFinances(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('finances')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getFinances() {
        return this.finances.isPresent();
    }

    clickOnItemNavCustomers(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('customers')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getCustomers() {
        return this.customers.isPresent();
    }

    clickOnItemNavMonitoring(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('gsm')), 5000).then(function (el: webdriver.IWebElement) {
                el.click();
                ptor.wait(protractor.until.elementLocated(by.className('monitoring')), 5000).then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                    reject(errback);
                });
            });
        });
    }
    getMonitoring() {
        return this.monitoring.isPresent();
    }

    clickOnItemNavCarriers(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('carriers')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getCarriers() {
        return this.carriers.isPresent();
    }

    clickOnItemNavRouting(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('routing')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getRouting() {
        return this.routing.isPresent();
    }

    clickOnItemNavPrices(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('prices')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getPrices() {
        return this.prices.isPresent();
    }

    clickOnItemNavMccmnc(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('mccmnc')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getMccmnc() {
        return this.mccmnc.isPresent();
    }

    clickOnItemNavSmpp(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('smpp')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getSmpp() {
        return this.smpp.isPresent();
    }

    clickOnItemNavApi(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('api')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getApi() {
        return this.api.isPresent();
    }

    clickOnItemNavSystemsettings(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('systemsettings')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }
    getSystemsettings() {
        return this.systemsettings.isPresent();
    }

}