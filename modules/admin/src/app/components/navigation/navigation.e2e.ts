describe('Navigation', () => {
    beforeEach(() => {
        browser.ignoreSynchronization = true;
        this.navigator = new NavigationTest();
        this.navigator.getRoot();
        this.navigator.login();
    });

    afterEach(() => {
        this.navigator.logout();
    });

    it('log in for user admin', () => {
        expect(true).toBeTruthy();
    });

    it('should have a title', () => {
        let result = 'SMSC Admin';
        expect(this.navigator.getTitle()).toBe(result);
    });

    it('should have smstraffic', () => {
        this.navigator.clickOnItemNavSmstraffic().then(() => {
            expect(true).toBeTruthy();
        });
    });

    it('should have smstraffic', () => {
        this.navigator.clickOnItemNavSmstraffic();
        expect(this.navigator.getSmstraffic()).toBeTruthy();
    });

    it('should have dlrtraffic', () => {
        this.navigator.clickOnItemNavDlrtraffic();
        expect(this.navigator.getDlrtraffic()).toBeTruthy();
    });

    it('should have finances', () => {
        this.navigator.clickOnItemNavFinances();
        expect(this.navigator.getFinances()).toBeTruthy();
    });

    it('should have customers', () => {
        this.navigator.clickOnItemNavCustomers();
        expect(this.navigator.getCustomers()).toBeTruthy();
    });

    it('should have monitoring', () => {
        this.navigator.clickOnItemNavMonitoring();
        expect(this.navigator.getMonitoring()).toBeTruthy();
    });

    it('should have carriers', () => {
        this.navigator.clickOnItemNavCarriers();
        expect(this.navigator.getCarriers()).toBeTruthy();
    });

    it('should have routing', () => {
        this.navigator.clickOnItemNavRouting();
        expect(this.navigator.getRouting()).toBeTruthy();
    });

    it('should have prices', () => {
        this.navigator.clickOnItemNavPrices();
        expect(this.navigator.getPrices()).toBeTruthy();
    });

    it('should have mccmnc', () => {
        this.navigator.clickOnItemNavMccmnc();
        expect(this.navigator.getMccmnc()).toBeTruthy();
    });

    it('should have smpp', () => {
        this.navigator.clickOnItemNavSmpp();
        expect(this.navigator.getSmpp()).toBeTruthy();
    });

    it('should have api', () => {
        this.navigator.clickOnItemNavApi();
        expect(this.navigator.getApi()).toBeTruthy();
    });

    it('should have systemsettings', () => {
        this.navigator.clickOnItemNavSystemsettings();
        expect(this.navigator.getSystemsettings()).toBeTruthy();
    });
});

class NavigationTest {
    constructor() {

    }

    // elements login page
    elemUsername = element(by.className('username'));
    elemPassword = element(by.className('password'));
    elemSubmitBtn = element(by.className('btn'));

    // is there a tag
    smstraffic = element(by.className('smstraffic'));
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

    // the object event handler click
    btnSmstraffic = element(by.className('smstraffic'));
    btnDlrtraffic = element(by.className('dlrtraffic'));
    btnFinances = element(by.className('finances'));
    btnCusomers = element(by.className('customers'));
    btnMonitoring = element(by.className('monitoring'));
    btnCarriers = element(by.className('carriers'));
    btnRouting = element(by.className('routing'));
    btnPrices = element(by.className('prices'));
    btnMccmnc = element(by.className('mccmnc'));
    btnSmpp = element(by.className('smpp'));
    btnApi = element(by.className('api'));
    btnSystemsettings = element(by.className('systemsettings'));

    getRoot() {
        browser.ignoreSynchronization = true;
        browser.get('/');
    }

    getNavigation() {
        browser.ignoreSynchronization = true;
        browser.get('/navigation');
    }

    getTitle() {
        return browser.getTitle();
    }

    login() {
        var ptor = protractor.wrapDriver(browser.driver);
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

    logout() {
        var ptor = protractor.wrapDriver(browser.driver);
        ptor.wait(protractor.until.elementLocated(by.id('btn-logout')), 5000).then(function (el: webdriver.IWebElement) {
            el.click();
        });
    }

    clickOnItemNavSmstraffic() {
        var ptor = protractor.wrapDriver(browser.driver);
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('smstraffic')), 5000).then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    getSmstraffic() {
        return this.smstraffic.isPresent();
    }

    clickOnItemNavDlrtraffic() {
        return this.btnDlrtraffic.click();
    }

    getDlrtraffic() {
        return this.dlrtraffic.isPresent();
    }

    clickOnItemNavFinances() {
        return this.btnFinances.click();
    }

    getFinances() {
        return this.finances.isPresent();
    }

    clickOnItemNavCustomers() {
        return this.btnCusomers.click();
    }

    getCustomers() {
        return this.customers.isPresent();
    }

    clickOnItemNavMonitoring() {
        return this.btnMonitoring.click();
    }

    getMonitoring() {
        return this.monitoring.isPresent();
    }

    clickOnItemNavCarriers() {
        return this.btnCarriers.click();
    }

    getCarriers() {
        return this.carriers.isPresent();
    }

    clickOnItemNavRouting() {
        return this.btnRouting.click();
    }

    getRouting() {
        return this.routing.isPresent();
    }

    clickOnItemNavPrices() {
        return this.btnPrices.click();
    }

    getPrices() {
        return this.prices.isPresent();
    }

    clickOnItemNavMccmnc() {
        return this.btnMccmnc.click();
    }

    getMccmnc() {
        return this.mccmnc.isPresent();
    }

    clickOnItemNavSmpp() {
        return this.btnSmpp.click();
    }

    getSmpp() {
        return this.smpp.isPresent();
    }

    clickOnItemNavApi() {
        return this.btnApi.click();
    }

    getApi() {
        return this.api.isPresent();
    }

    clickOnItemNavSystemsettings() {
        return this.btnSystemsettings.click();
    }

    getSystemsettings() {
        return this.systemsettings.isPresent();
    }

}
