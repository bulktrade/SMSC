import { LoginModel } from './login.model';
import { EC } from "../common/expectedConditions";

export class LoginPage {
    public elemNotFound = element(by.tagName('notfound'));
    public errorAlert = element(by.id('errorAlert'));
    public submitButton = element(by.id('submitButton'));
    public loginWindow = element(by.id('login'));
    public usernameField = element(by.css('.username input'));
    public passwordField = element(by.css('.password input'));

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
        var isClickableUsername = EC.elementToBeClickable(this.usernameField);
        var isClickablePassword = EC.elementToBeClickable(this.passwordField);
        var isClickableSubmit = EC.elementToBeClickable(this.passwordField);

        browser.wait(EC.and(isClickableUsername, isClickablePassword, isClickableSubmit), 5000);

        this.usernameField.sendKeys(loginModel.username);
        this.passwordField.sendKeys(loginModel.password);
        this.submitButton.submit();
    }

    login() {
        let loginModel: LoginModel = new LoginModel('admin', 'admin', false);
        this.fillLoginForm(loginModel);
    }
}

