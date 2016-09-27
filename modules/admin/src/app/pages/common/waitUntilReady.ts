export class WaitUntil {
    public static logoutBtn = element(by.id('logout'));

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
}
