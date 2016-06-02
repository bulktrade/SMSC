import {NavigationTest} from './navigation.page';

describe('Navigation', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
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

    it('visible fa-angle-left if main item have sub menu', () => {
        this.navigator.waitUntilReady(this.navigator.firstNav, ptor);
        expect(this.navigator.firstNav.isPresent()).toBeTruthy();
        expect(this.navigator.lastNav.isPresent()).toBeFalsy();
    });

    it('should have smstraffic', () => {
        this.navigator.clickOnItemNavSmstraffic(ptor).then(() => {
            expect(this.navigator.getSmstraffic()).toBeTruthy();
        });
    });

    it('AngularJS Translations', () => {
        let lang = this.navigator.getLanguage();

        this.navigator.waitUntilReady(this.navigator.dashboard, ptor);
        this.navigator.getDashboardText()
            .then((text) => {
                expect(lang).toEqual(text);
            });
    });

    it('marked sub and main item navigation like active', () => {
        this.navigator.waitUntilReady(this.navigator.titleDash, ptor);
        this.navigator.hasClass(this.navigator.titleDash, 'active').then((data) => {
            expect(data).toBeTruthy();
            this.navigator.hasClass(this.navigator.titleDlrtraffic, 'activesub').then((res) => {
                expect(res).toBeTruthy();
            });
        });
    });

    it('should have navigation directive', () => {
        expect(this.navigator.isPresentNavDirective()).toBeTruthy();
    });

    it('should have navigation item directive', () => {
        expect(this.navigator.isPresentNavItemDirective()).toBeTruthy();
    });

    it('should have dlrtraffic', () => {
        this.navigator.clickOnItemNavDlrtraffic(ptor).then(() => {
            expect(this.navigator.getDlrtraffic()).toBeTruthy();
        });
    });

    it('responsive navigation', () => {
        let width  = 900,
            height = 1300;
        ptor.manage().window().setSize(width, height);
        this.navigator.navigation.getCssValue('width')
            .then(value => {
                let widthElem = Number(value.substring(0, value.length - 2));
                expect(widthElem > 230).toBeTruthy();
            });
    });

    it('save state navigation after refresh page', () => {
        ptor.refresh()
            .then(() => {
                this.navigator.dashSubMenu.getCssValue('height')
                    .then(value => {
                        let heightElem = Number(value.substring(0, value.length - 2));
                        expect(heightElem).toBe(0);
                    });
            });
    });

    it('should have finances', () => {
        this.navigator.clickOnItemNavFinances(ptor).then(() => {
                expect(this.navigator.getFinances()).toBeTruthy();
            });
    });

    it('should have monitoring', () => {
        this.navigator.clickOnItemNavMonitoring(ptor).then(() => {
                expect(this.navigator.getMonitoring()).toBeTruthy();
            });
    });

    // it('should have carriers', () => {
    //     this.navigator.clickOnItemNavCarriers(ptor)
    //         .then(() => {
    //             expect(this.navigator.getCarriers()).toBeTruthy();
    //         });
    // });
    //
    // it('should have routing', () => {
    //     this.navigator.clickOnItemNavRouting(ptor)
    //         .then(() => {
    //             expect(this.navigator.getRouting()).toBeTruthy();
    //         });
    // });

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

    // todo: soon will be fixed
    //
    // it('should have customers', () => {
    //     this.navigator.clickOnItemNavCustomers(ptor).then(() => {
    //             expect(this.navigator.getCustomers()).toBeTruthy();
    //         });
    // });
});
