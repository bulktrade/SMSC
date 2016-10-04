import { WaitUntil } from '../common/waitUntilReady';
import { LoginModel } from "./login.model";

export class LoginPage {
    public loginModel = new LoginModel('admin', 'admin', false);
    public elemNotFound = element(by.tagName('notfound'));
    public errorAlert = element(by.id('errorAlert'));
    public submitButton = by.id('submitButton');
    public loginWindow = element(by.id('login'));
    public usernameField = by.css('.username input');
    public passwordField = by.css('.password input');

    private _ptor;

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getNotFound() {
        browser.get(browser.baseUrl + '/noContent');
    }

    fillUsernameField(data, ptor) {
        return ptor.wait(protractor.until.elementLocated(this.usernameField), 5000)
            .then((element) => {
                element.clear()
                    .then(() => {
                        element.sendKeys(data);
                    })
            });
    }

    fillPasswordField(data, ptor) {
        return ptor.wait(protractor.until.elementLocated(this.passwordField), 5000)
            .then((element) => {
                element.clear()
                    .then(() => {
                        element.sendKeys(data);
                    })
            });
    }

    isPresentLoginWindow() {
        WaitUntil.waitUntil(this.loginWindow, this._ptor);
        return this.loginWindow.isPresent();
    }

    isPresentNotFound() {
        WaitUntil.waitUntil(this.elemNotFound, this._ptor);
        return this.elemNotFound.isPresent();
    }

    isPresentErrorAlert() {
        WaitUntil.waitUntil(this.errorAlert, this._ptor);
        return this.errorAlert.isPresent();
    }

    clickOnSubmitButton(ptor) {
        return ptor.wait(protractor.until.elementLocated(this.submitButton), 5000)
            .then((element) => {
                element.click();
            });
    }

    login() {
        let ptor = protractor.wrapDriver(browser.driver);

        return this.fillUsernameField(this.loginModel.username, ptor)
            .then(() => {
                return this.fillPasswordField(this.loginModel.password, ptor)
                    .then(() => {
                        return this.clickOnSubmitButton(ptor);
                    });
            });
    }

    // getters and setter

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}

