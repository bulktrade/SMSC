import { CrudPage } from "../pages/crud.page";
import { WaitUntilReady } from "../pages/common/waitUntilReady";

describe('CRUD', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let crudPage: CrudPage = new CrudPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        crudPage.ptor = ptor;
        crudPage.crudCreate.ptor = ptor;
        crudPage.crudDelete.ptor = ptor;
    });

    it('log in smsc.io', () => {
        crudPage.get();
        crudPage.login.login();
        expect(crudPage.isPresentLogo()).toBeTruthy();
    });

    it('should navigate to the customer', () => {
        crudPage.clickOnCustomers();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should navigate to the create', () => {
        crudPage.clickOnBtnAddRecord();
        expect(crudPage.isPresentCrudCreateTag()).toBeTruthy();
    });

    it('should be create the new record', () => {
        crudPage.crudCreate.isVisibleHint()
            .then(css => {
                expect(css).toEqual('inline');
            });
        crudPage.fillInputFields();
        crudPage.crudCreate.isVisibleHint()
            .then(css => {
                expect(css).toEqual('none');
            });
        crudPage.crudCreate.fillLinkset();
        crudPage.clickOnFormBtn();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('delete button should be disabled', () => {
        crudPage.clickOnBackBtn();
        expect(crudPage.isEnabledDeleteButton()).toBeFalsy();
    });

    it('delete button should be enabled', () => {
        crudPage.crudCreate.clickOnSelectAll();
        crudPage.clickOnDeleteButton();
        expect(crudPage.crudDelete.isPresentCrudDelete()).toBeTruthy();
    });

    it('should be delete records', () => {
        crudPage.crudDelete.clickOnOkBtn();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should logout', () => {
        WaitUntilReady.logout(ptor);
        expect(true).toBeTruthy();
    });

});
