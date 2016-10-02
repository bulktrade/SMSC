export class AppTest {

    public elemUsername = element(by.className('username'));
    public elemPassword = element(by.className('password'));

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    isPresentUsername() {
        return this.elemUsername.isPresent();
    }

    isPresentPassword() {
        return this.elemPassword.isPresent();
    }

}
