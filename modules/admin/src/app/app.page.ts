import { EC } from './common/expected-conditions';

export class AppTest {

    public elemUsername = element(by.id('username'));
    public elemPassword = element(by.id('password'));

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    isPresentUsername() {
        browser.wait(EC.presenceOf(this.elemUsername), 5000);
        return this.elemUsername.isPresent();
    }

    isPresentPassword() {
        browser.wait(EC.presenceOf(this.elemPassword), 5000);
        return this.elemPassword.isPresent();
    }

}
