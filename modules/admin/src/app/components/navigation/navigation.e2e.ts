import {NavigationTest} from '../testpages/NavigationTest';

describe('Navigation', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        browser.ignoreSynchronization = true;
        this.navigator = new NavigationTest();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('should have a title', () => {
        this.navigator.getRoot();
        let result = 'SMSC Admin';
        expect(this.navigator.getTitle()).toBe(result);
    });

    it('login', () => {
        this.navigator.login.login();
        expect(true).toBeTruthy();
    });

    it('should have smstraffic', () => {
        this.navigator.clickOnItemNavSmstraffic(ptor).then(() => {
            expect(this.navigator.getSmstraffic()).toBeTruthy();
        });
    });

    it('should have dlrtraffic', () => {
        this.navigator.clickOnItemNavDlrtraffic(ptor).then(() => {
            expect(this.navigator.getDlrtraffic()).toBeTruthy();
        });
    });

    it('should have finances', () => {
        this.navigator.clickOnItemNavFinances(ptor).then(() => {
                expect(this.navigator.getFinances()).toBeTruthy();
            });
    });

    it('should have customers', () => {
        this.navigator.clickOnItemNavCustomers(ptor).then(() => {
                expect(this.navigator.getCustomers()).toBeTruthy();
            });
    });

    it('should have monitoring', () => {
        this.navigator.clickOnItemNavMonitoring(ptor).then(() => {
                expect(this.navigator.getMonitoring()).toBeTruthy();
            });
    });

    it('should have carriers', () => {
        this.navigator.clickOnItemNavCarriers(ptor)
            .then(() => {
                expect(this.navigator.getCarriers()).toBeTruthy();
            });
    });

    it('should have routing', () => {
        this.navigator.clickOnItemNavRouting(ptor)
            .then(() => {
                expect(this.navigator.getRouting()).toBeTruthy();
            });
    });

    it('should have prices', () => {
        this.navigator.clickOnItemNavPrices(ptor)
            .then(() => {
                expect(this.navigator.getPrices()).toBeTruthy();
            });
    });

    it('should have mccmnc', () => {
        this.navigator.clickOnItemNavMccmnc(ptor)
            .then(() => {
                expect(this.navigator.getMccmnc()).toBeTruthy();
            });
    });

    it('should have smpp', () => {
        this.navigator.clickOnItemNavSmpp(ptor)
            .then(() => {
                expect(this.navigator.getSmpp()).toBeTruthy();
            });
    });

    it('should have api', () => {
        this.navigator.clickOnItemNavApi(ptor)
            .then(() => {
                expect(this.navigator.getApi()).toBeTruthy();
            });
    });

    it('should have systemsettings', () => {
        this.navigator.clickOnItemNavSystemsettings(ptor)
            .then(() => {
                expect(this.navigator.getSystemsettings()).toBeTruthy();
            });
    });

});
