import { WaitUntil } from '../pages/common/waitUntilReady';
import { CrudMetaDataPage } from "../pages/crudMetaData.page";

describe('CrudMetaData', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let crudMetaDataPage: CrudMetaDataPage = new CrudMetaDataPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        crudMetaDataPage.ptor = ptor;
    });

    it('log in smsc.io', () => {
        crudMetaDataPage.get();
        crudMetaDataPage.login.login();
        expect(crudMetaDataPage.isPresentLogo()).toBeTruthy();
    });

    it('should navigate to the customer', () => {
        crudMetaDataPage.clickOnCustomers();
        expect(crudMetaDataPage.isPresentCustomers()).toBeTruthy();
    });

    it('should navigate to the create', () => {
        let width = 1980,
            height = 1020;
        ptor.manage().window().setSize(width, height);

        crudMetaDataPage.clickOnBtnAddRecord();
        expect(crudMetaDataPage.isPresentCrudCreateTag()).toBeTruthy();
    });

    it('readonly should be false', () => {
        crudMetaDataPage.companyNameField.getAttribute('readonly')
            .then(readonly => {
                expect(readonly).toBeNull();
            })
    });

    it('country field should be displayed', () => {
        expect(crudMetaDataPage.isPresentCountryField(false)).toBeTruthy();
    });

    it('order should be descending', () => {
        crudMetaDataPage.firstFieldInForm.getAttribute('class')
            .then(classes => {
                expect(crudMetaDataPage.isExistClass(classes, 'customerId')).toBeTruthy();
            });
    });

    it('should navigate to the formMetaData', () => {
        crudMetaDataPage.clickOnMetaData();
        crudMetaDataPage.clickOnFormMetaData();
        expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
    });

    it('should be change visible property', () => {
        crudMetaDataPage.hideProperty();
        expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
    });

    it('should be change editable property', () => {
        crudMetaDataPage.readonlyProperty();
        expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
    });

    it('should be change order property', () => {
        crudMetaDataPage.orderProperty("3");
    });

    it('should navigate to the customer', () => {
        crudMetaDataPage.clickOnCustomers();
        expect(crudMetaDataPage.isPresentCustomers()).toBeTruthy();
    });

    it('should navigate to the create', () => {
        crudMetaDataPage.clickOnBtnAddRecord();
        expect(crudMetaDataPage.isPresentCrudCreateTag()).toBeTruthy();
    });

    it('readonly should be true', () => {
        crudMetaDataPage.companyNameField.getAttribute('readonly')
            .then(readonly => {
                expect(readonly).toBeTruthy();
            })
    });

    it('country field should be hidden', () => {
        crudMetaDataPage.countryField.isDisplayed()
            .then(isDisplayed => {
                expect(isDisplayed).toBeFalsy();
            });
    });

    it('order should be ascending', () => {
        crudMetaDataPage.firstFieldInForm.getAttribute('class')
            .then(classes => {
                expect(crudMetaDataPage.isExistClass(classes, 'companyName')).toBeTruthy();
            });
    });

    it('should navigate to the formMetaData', () => {
        crudMetaDataPage.clickOnFormMetaData();
        expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
    });

    it('should be change visible property', () => {
        crudMetaDataPage.hideProperty();
        expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
    });

    it('should be change editable property', () => {
        crudMetaDataPage.readonlyProperty();
        expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
    });

    it('should be change order property', () => {
        crudMetaDataPage.orderProperty("1");
    });

    it('should logout', () => {
        WaitUntil.logout(ptor);
        expect(WaitUntil.isPresentLogin(ptor)).toBeTruthy();
    });

});
