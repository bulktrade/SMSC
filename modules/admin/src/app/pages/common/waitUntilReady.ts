export class WaitUntil {
    public static logoutBtn = element(by.id('logout'));
    public static loginComponent = element(by.tagName('login'));

    static waitUntil(elm, ptor, isHide?: boolean) {
        ptor.wait(() => {
            return elm.isPresent()
                .then((isPresent: boolean) => {
                    if (isHide) {
                        return Promise.resolve(!isPresent);
                    } else {
                        return Promise.resolve(isPresent);
                    }
                });
        }, 10000);
        ptor.wait(() => {
            return elm.isDisplayed()
                .then((isDisplayed: boolean) => {
                    if (isHide) {
                        return Promise.resolve(!isDisplayed);
                    } else {
                        return Promise.resolve(isDisplayed);
                    }
                });
        }, 10000);
    };

    static logout(ptor) {
        WaitUntil.waitUntil(WaitUntil.logoutBtn, ptor);
        WaitUntil.logoutBtn.click();
    }

    static isPresentLogin(ptor) {
        WaitUntil.waitUntil(WaitUntil.loginComponent, ptor);
        return WaitUntil.loginComponent.isPresent();
    }
}
