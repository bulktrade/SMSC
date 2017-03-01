import {LoginPage} from "./login.page";
import {LoginModel} from "./login.model";

describe('LoginComponent page', () => {
    let loginPage = new LoginPage();

    it('should display login window', () => {
        loginPage.get();
        expect(loginPage.isPresentLoginWindow()).toBeTruthy();
    });

    it('should display alert danger', () => {
        let model: LoginModel = new LoginModel('root', '123t', false);
        loginPage.fillLoginForm(model);
        expect(loginPage.isPresentErrorAlert()).toBeTruthy();
    });

    it('should log in', () => {
        let model: LoginModel = new LoginModel('admin', 'admin', false);
        loginPage.fillLoginForm(model);
        expect(loginPage.isPresentNavigation()).toBeTruthy();
    });

    it('is exist page 404 not found', () => {
        loginPage.getNotFound();
        expect(loginPage.isPresentNotFound).toBeTruthy();
    });

});
