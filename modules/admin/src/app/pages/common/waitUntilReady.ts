export class WaitUntilReady {
    static waitUntilReady(elm, ptor) {
        ptor.wait(() => {
            return elm.isPresent();
        }, 10000);
        ptor.wait(() => {
            return elm.isDisplayed();
        }, 10000);
    };
}