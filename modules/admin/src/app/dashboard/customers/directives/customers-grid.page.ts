import elementLocated = protractor.until.elementLocated;
import elementsLocated = protractor.until.elementsLocated;
import {Login} from '../../../login/login.loginpage';

export class CustomerGridTest {
    public login: Login;

    // need elements
    addBtn = element(by.id('button-1015-btnWrap'));
    removeBtn = element(by.id('button-1061-btnWrap'));
    list = element.all(by.css('.x-grid-item-container table'));
    firstRow = element.all(by.css('.x-grid-item-container table'));

    constructor() {
        this.login = new Login();
    }

    get() {
        browser.get('/');
    }

    clickOnItemNavCustomers(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('dashboard')), 5000).then(function (el:webdriver.IWebElement) {
                el.click()
                    .then(() => {
                        ptor.wait(protractor.until.elementLocated(by.className('customers')), 5000)
                            .then((el:webdriver.IWebElement) => {
                                return el.click();
                            });
                    });
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    clickBtnWrap(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('customers')), 5000).then(function (el:webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    getCountRows() {
        return this.list.count();
    }

    getFirstRow() {
        return this.firstRow.first();
    }

    remove(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(this.getFirstRow()), 5000).then(function (el: webdriver.IWebElement) {
                el.click();
                ptor.wait(protractor.until.elementLocated(this.removeBtn), 5000).then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                });
            });
        });
    }

    waitUntilReady(elm, ptor) {
        ptor.wait(function () {
            return elm.isPresent();
        },10000);
        ptor.wait(function () {
            return elm.isDisplayed();
        },10000);
    };

}