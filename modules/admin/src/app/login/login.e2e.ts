import { LoginPage } from '../pages/login.page';
import { WaitUntilReady } from "../pages/common/waitUntilReady";

describe('Login page', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let loginPage = new LoginPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        loginPage.ptor = ptor;
    });

    it('validation for empty fields', () => {
        loginPage.get();
        WaitUntilReady.waitUntilReady(loginPage.btnSubmit, ptor);
        expect(loginPage.btnSubmit.isEnabled()).toBeFalsy();
    });

    it('show navigation content', () => {
        loginPage.getCustomers();
        expect(loginPage.isPresentUsernameField()).toBeTruthy();
    });

    it('is exist page 404 not found', () => {
        loginPage.getNotFound();
        expect(loginPage.isPresentNotFound).toBeTruthy();
    });

    it('responsive navigation', () => {
        let width = 330,
            height = 1300;
        ptor.manage().window().setSize(width, height);
        WaitUntilReady.waitUntilReady(loginPage.details, ptor);
        loginPage.details.getCssValue('text-align')
            .then(value => {
                expect(value).toEqual('center');
            });
    });

});
