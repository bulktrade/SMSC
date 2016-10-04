import { LoginPage } from './login.page';
import { LoginModel } from "./login.model";

describe('Login page', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let loginPage = new LoginPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        loginPage.ptor = ptor;
    });

    it('should display login window', () => {
        loginPage.get();
        expect(loginPage.isPresentLoginWindow()).toBeTruthy();
    });

    it('should display alert danger', () => {
        let incorrectData = new LoginModel('root', '123t', false);

        loginPage.fillUsernameField(incorrectData.username, ptor)
            .then(() => {
                loginPage.fillPasswordField(incorrectData.password, ptor)
                    .then(() => {
                        loginPage.clickOnSubmitButton(ptor)
                            .then(() => {
                                expect(loginPage.isPresentErrorAlert()).toBeTruthy();
                            })
                    })
            })
    });

    it('is exist page 404 not found', () => {
        loginPage.getNotFound();
        expect(loginPage.isPresentNotFound).toBeTruthy();
    });

});
