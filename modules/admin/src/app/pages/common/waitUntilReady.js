"use strict";
var WaitUntilReady = (function () {
    function WaitUntilReady() {
    }
    WaitUntilReady.waitUntilReady = function (elm, ptor) {
        ptor.wait(function () {
            return elm.isPresent();
        }, 10000);
        ptor.wait(function () {
            return elm.isDisplayed();
        }, 10000);
    };
    ;
    WaitUntilReady.logout = function (ptor) {
        WaitUntilReady.waitUntilReady(WaitUntilReady.logoutBtn, ptor);
        WaitUntilReady.logoutBtn.click();
    };
    //  Dont commit
    //public static logoutBtn = element(by.id('logout'));
    WaitUntilReady.logoutBtn = $('#logout');
    return WaitUntilReady;
}());
exports.WaitUntilReady = WaitUntilReady;
//# sourceMappingURL=waitUntilReady.js.map