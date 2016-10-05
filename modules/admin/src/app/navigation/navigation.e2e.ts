import { NavigationTest } from '../pages/navigation.page';
import { WaitUntil } from '../pages/common/waitUntilReady';

describe('Navigation', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.navigator = new NavigationTest();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('should have a title', () => {
        this.navigator.get();
        let result = 'SMSC Admin';
        expect(this.navigator.getTitle()).toBe(result);
    });

    it('login', () => {
        this.navigator.login.login();
        expect(true).toBeTruthy();
    });

    it('should have dashboard', () => {
        this.navigator.clickOnItemNavDashboard(ptor).then(() => {
            expect(this.navigator.getDashboard()).toBeTruthy();
        });
    });

    it('AngularJS Translations', () => {
        let lang = this.navigator.getLanguage();

        WaitUntil.waitUntil(this.navigator.dashboardTitle, ptor);
        this.navigator.getDashboardText()
            .then((text) => {
                expect(lang).toEqual(text);
            });
    });

    it('marked sub and main item navigation like active', () => {
        WaitUntil.waitUntil(this.navigator.dashboardItem, ptor);
        this.navigator.hasClass(this.navigator.dashboardItem, 'active').then((data) => {
            expect(data).toBeTruthy();
        });
    });

    it('should have navigation directive', () => {
        expect(this.navigator.isPresentNavDirective()).toBeTruthy();
    });

    it('should have customers', () => {
        this.navigator.clickOnItemNavCustomers(ptor).then(() => {
            expect(this.navigator.getCustomers()).toBeTruthy();
        });
    });

    it('responsive navigation', () => {
        let width = 900,
            height = 1300;
        ptor.manage().window().setSize(width, height);
        this.navigator.sidebarDirective.getCssValue('width')
            .then(value => {
                expect(value).toEqual('auto');
            });
    });
});
