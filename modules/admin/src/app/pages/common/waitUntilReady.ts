export class WaitUntilReady {
    public static logoutBtn = element(by.id('logout'));

    static waitUntilReady(elm, ptor) {
        ptor.wait(() => {
            return elm.isPresent();
        }, 10000);
        ptor.wait(() => {
            return elm.isDisplayed();
        }, 10000);
    };

    static logout(ptor) {
        WaitUntilReady.waitUntilReady(WaitUntilReady.logoutBtn, ptor);
        WaitUntilReady.logoutBtn.click();
    }
}
