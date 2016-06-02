import {LoginTest} from './login.page';

describe('Login page', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.lognpg = new LoginTest();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('validation for empty fields', () => {
        this.lognpg.get();
        expect(this.lognpg.btnSubmit.isEnabled()).toBeFalsy();
    });

    it('show navigation content', () => {
        this.lognpg.getNavigation();
        expect(this.lognpg.isPresentMainContent()).toBeFalsy();
    });

    it('is exist page 404 not found', () => {
        this.lognpg.getNotFound();
        expect(this.lognpg.isPresentNotFound).toBeTruthy();
    });

    it('responsive navigation', () => {
        let width = 330,
            height = 1300;
        ptor.manage().window().setSize(width, height);
        this.lognpg.details.getCssValue('text-align')
            .then(value => {
                expect(value).toEqual('center');
            });
    });

});
