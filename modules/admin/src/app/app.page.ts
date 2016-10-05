import { EC } from "./common/expectedConditions";
export class AppTest {

    public elemUsername = element(by.className('username'));
    public elemPassword = element(by.className('password'));

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
