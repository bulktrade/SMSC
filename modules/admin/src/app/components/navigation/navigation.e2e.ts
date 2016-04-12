import {NavigationTest} from '../testpages/NavigationTest';

describe('Navigation', () => {

    beforeEach(() => {
        browser.ignoreSynchronization = true;
        this.navigator = new NavigationTest();
    });

    it('should have a title', () => {
        this.navigator.getRoot();
        let result = 'SMSC Admin';
        expect(this.navigator.getTitle()).toBe(result);
    });

    it('login', () => {
        this.navigator.login();
        expect(true).toBeTruthy();
    });

    it('should have smstraffic', () => {
        this.navigator.clickOnItemNavSmstraffic().then(() => {
            expect(this.navigator.getSmstraffic()).toBeTruthy();
        });
    });

    it('should have dlrtraffic', () => {
        this.navigator.clickOnItemNavDlrtraffic().then(() => {
            expect(this.navigator.getDlrtraffic()).toBeTruthy();
        });
    });

    it('should have finances', () => {
        this.navigator.clickOnItemNavFinances().then(() => {
                expect(this.navigator.getFinances()).toBeTruthy();
            });
    });

    it('should have customers', () => {
        this.navigator.clickOnItemNavCustomers().then(() => {
                expect(this.navigator.getCustomers()).toBeTruthy();
            });
    });

    it('should have monitoring', () => {
        this.navigator.clickOnItemNavMonitoring().then(() => {
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
