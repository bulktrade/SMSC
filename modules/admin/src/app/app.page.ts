export class AppTest {

    elemUsername = element(by.className('username'));
    elemPassword = element(by.className('password'));
    elemBtn = element(by.className('btn'));

    constructor() {}

    get() {
        browser.get('/');
    }

    isPresentUsername() {
        return this.elemUsername.isPresent();
    }

    isPresentPassword() {
        return this.elemPassword.isPresent();
    }

    isPresentBtn() {
        return this.elemBtn.isPresent();
    }

    waitUntilReady(elm, ptor) {
        ptor.wait(function () {
            return elm.isPresent();
        }, 10000);
        ptor.wait(function () {
            return elm.isDisplayed();
        }, 10000);
    };

}
