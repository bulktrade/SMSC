describe('Navigation', () => {

    beforeEach(() => {
        this.navigator = new NavigationTest();
    });

    it('should have a title', () => {
        this.navigator.getRoot();
        this.navigator.login();

        let result  = 'SMSC Admin';
        expect(this.navigator.getTitle()).toBe(result);
    });

    //~~~~~~~~~~~~~~~~~~~ Nav items ~~~~~~~~~~~~~~~~~~~~~~~

    it('should have smstraffic', () => {
        this.navigator.btnDashboard.click()
            .then(() => {
                this.navigator.btnGsm.click()
                    .then(() => {
                        this.navigator.clickOnItemNavSmstraffic()
                            .then(() => {
                                expect(this.navigator.getSmstraffic()).toBeTruthy();
                            });
                    });
            })

    });

    it('should have dlrtraffic', () => {
        this.navigator.clickOnItemNavDlrtraffic()
            .then(() => {
                expect(this.navigator.getDlrtraffic()).toBeTruthy();
            });
    });

    it('should have finances', () => {
        this.navigator.clickOnItemNavFinances()
            .then(() => {
                expect(this.navigator.getFinances()).toBeTruthy();
            });
    });

    it('should have customers', () => {
        this.navigator.clickOnItemNavCustomers()
            .then(() => {
                expect(this.navigator.getCustomers()).toBeTruthy();
            });
    });

    it('should have monitoring', () => {
        this.navigator.clickOnItemNavMonitoring()
            .then(() => {
                expect(this.navigator.getMonitoring()).toBeTruthy();
            });
    });

    it('should have carriers', () => {
        this.navigator.clickOnItemNavCarriers()
            .then(() => {
                expect(this.navigator.getCarriers()).toBeTruthy();
            });
    });

    it('should have routing', () => {
        this.navigator.clickOnItemNavRouting()
            .then(() => {
                expect(this.navigator.getRouting()).toBeTruthy();
            });
    });

    it('should have prices', () => {
        this.navigator.clickOnItemNavPrices()
            .then(() => {
                expect(this.navigator.getPrices()).toBeTruthy();
            });
    });

    it('should have mccmnc', () => {
        this.navigator.clickOnItemNavMccmnc()
            .then(() => {
                expect(this.navigator.getMccmnc()).toBeTruthy();
            });
    });

    it('should have smpp', () => {
        this.navigator.clickOnItemNavSmpp()
            .then(() => {
                expect(this.navigator.getSmpp()).toBeTruthy();
            });
    });

    it('should have api', () => {
        this.navigator.clickOnItemNavApi()
            .then(() => {
                expect(this.navigator.getApi()).toBeTruthy();
            });
    });

    it('should have systemsettings', () => {
        this.navigator.clickOnItemNavSystemsettings()
            .then(() => {
                expect(this.navigator.getSystemsettings()).toBeTruthy();
            });
    });

});

class NavigationTest {
    // elements login page
    elemUsername  = element(by.className('username'));
    elemPassword  = element(by.className('password'));
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

    btnDashboard = element(by.className('dashboard'));
    btnGsm = element(by.className('gsm'));

    getRoot() {
        browser.get('/');
    }

    getNavigation() {
        browser.get('/navigation');
    }

    getTitle() {
        return browser.getTitle();
    }

    login() {
        this.elemUsername.sendKeys('admin');
        this.elemPassword.sendKeys('admin');
        this.elemSubmitBtn.submit();
    }

    clickOnItemNavSmstraffic() {
        return this.btnSmstraffic.click();
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
