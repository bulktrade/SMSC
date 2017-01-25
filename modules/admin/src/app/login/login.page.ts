import { LoginModel } from './login.model';
import { EC } from '../common/expected-conditions';

export class LoginPage {
    public elemNotFound = element(by.tagName('notfound'));
    public errorAlert = element(by.id('growl'));
    public submitButton = element(by.className('submitButton'));
    public loginWindow = element(by.id('login-window'));
    public usernameField = element(by.id('username'));
    public passwordField = element(by.id('password'));
    public logoutBtn = element(by.id('logout'));
    public loginComponent = element(by.tagName('login'));

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getNotFound() {
        browser.get(browser.baseUrl + '/noContent');
    }

    isPresentLoginWindow() {
        browser.wait(EC.presenceOf(this.loginWindow), 5000);
        return this.loginWindow.isPresent();
    }

    isPresentNotFound() {
        browser.wait(EC.presenceOf(this.elemNotFound), 5000);
        return this.elemNotFound.isPresent();
    }

    isPresentErrorAlert() {
        browser.wait(EC.presenceOf(this.errorAlert), 5000);
        return this.errorAlert.isPresent();
    }

    fillLoginForm(loginModel: LoginModel) {
        let isClickableUsername = EC.elementToBeClickable(this.usernameField);
        let isClickablePassword = EC.elementToBeClickable(this.passwordField);
        let isClickableSubmit = EC.elementToBeClickable(this.passwordField);

        browser.wait(EC.and(isClickableUsername, isClickablePassword, isClickableSubmit), 5000);

        this.usernameField.sendKeys(loginModel.username);
        this.passwordField.sendKeys(loginModel.password);
        this.submitButton.submit();
    }

    login() {
        let loginModel: LoginModel = new LoginModel('Admin', 'admin', false);
        this.fillLoginForm(loginModel);
    }

    logout() {
        browser.wait(EC.elementToBeClickable(this.logoutBtn), 5000);
        this.logoutBtn.click();
    }

    isPresentLogin() {
        browser.wait(EC.presenceOf(this.loginComponent), 5000);
        return this.loginComponent.isPresent();
    }
}
