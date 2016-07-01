import {LoginPage} from './login.page';

describe('Login page', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.page = new LoginPage();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('validation for empty fields', () => {
        this.page.get();
        expect(this.page.btnSubmit.isEnabled()).toBeFalsy();
    });

    it('show navigation content', () => {
        this.page.getNavigation();
        expect(this.page.isPresentMainContent()).toBeFalsy();
    });

    it('is exist page 404 not found', () => {
        this.page.getNotFound();
        expect(this.page.isPresentNotFound).toBeTruthy();
    });

    it('responsive navigation', () => {
        let width = 330,
            height = 1300;
        ptor.manage().window().setSize(width, height);
        this.page.details.getCssValue('text-align')
            .then(value => {
                expect(value).toEqual('center');
            });
    });

});
