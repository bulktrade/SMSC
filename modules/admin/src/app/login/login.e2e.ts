import { LoginPage } from '../pages/login.page';
import { WaitUntil } from '../pages/common/waitUntilReady';

describe('Login page', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let loginPage = new LoginPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        loginPage.ptor = ptor;
    });

    it('validation for empty fields', () => {
        loginPage.get();
        WaitUntil.waitUntil(loginPage.btnSubmit, ptor);
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

});
