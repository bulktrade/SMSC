"use strict";
var crud_page_1 = require('../pages/crud.page');
var waitUntilReady_1 = require('../pages/common/waitUntilReady');
describe('CRUD', function () {
    var ptor = protractor.wrapDriver(browser.driver);
    var crudPage = new crud_page_1.CrudPage();
    beforeEach(function () {
        ptor = protractor.wrapDriver(browser.driver);
        crudPage.ptor = ptor;
        crudPage.crudCreate.ptor = ptor;
        crudPage.crudDelete.ptor = ptor;
    });
    it('log in smsc.io', function () {
        crudPage.get();
        crudPage.login.login();
        expect(crudPage.isPresentLogo()).toBeTruthy();
    });
    it('should navigate to the customer', function () {
        crudPage.clickOnCustomers();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });
    it('should navigate to the create', function () {
        crudPage.clickOnBtnAddRecord();
        expect(crudPage.isPresentCrudCreateTag()).toBeTruthy();
    });
    it('should be create the new record', function () {
        crudPage.crudCreate.isVisibleHint()
            .then(function (css) {
            expect(css).toEqual('inline');
        });
        crudPage.crudCreate.fillInputFields(crudPage.crudCreate.inputElementsOnFirstLevel);
        crudPage.crudCreate.isVisibleHint()
            .then(function (css) {
            expect(css).toEqual('none');
        });
        crudPage.crudCreate.fillLinkset();
        crudPage.crudCreate.clickOnFormBtn();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });
    it('delete button should be disabled', function () {
        crudPage.clickOnBackBtn();
        expect(crudPage.isEnabledDeleteButton()).toBeFalsy();
    });
    // @todo fix it
    // it('delete button should be enabled', () => {
    //     crudPage.crudCreate.clickOnSelectAll();
    //     crudPage.clickOnDeleteButton();
    //     expect(crudPage.crudDelete.isPresentCrudDelete()).toBeTruthy();
    // });
    // it('should be delete records', () => {
    //     crudPage.crudDelete.clickOnOkBtn();
    //     expect(crudPage.isPresentCustomers()).toBeTruthy();
    // });
    it('should be delete records on second level', function () {
        crudPage.clickOnBtnAddRecord();
        crudPage.crudCreate.clickOnContactsLinksetBtn();
        crudPage.crudCreate.clickOnSelectAll();
        crudPage.clickOnDeleteButton();
        crudPage.crudDelete.clickOnOkBtn();
    });
    // @todo not right place. crud.e2e has include only crud tests.
    it('should logout', function () {
        waitUntilReady_1.WaitUntilReady.logout(ptor);
        expect(true).toBeTruthy();
    });
});
//# sourceMappingURL=crud.e2e.js.map