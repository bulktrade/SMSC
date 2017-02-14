import { LoginPage } from "../login/login.page";
import { EC } from "../shared/expected-conditions";
import { element, by, browser } from "protractor";

export class CrudMetaDataPage {
    public login: LoginPage = new LoginPage();

    public logo = element(by.id('logo'));
    public customersItem = element(by.className('customers'));
    public customersTag = element(by.tagName('customers'));
    public formBtn = element(by.id('modify'));
    public metaDataItem = element(by.className('crudmetadata'));
    public formMetaDataItem = element(by.className('crudmetaformdata'));
    public formMetaDataTag = element(by.tagName('crudMetaFormData'));
    public btnAddRecord = element(by.id('addRow'));
    public crudCreateTag = element(by.tagName('crud-create'));
    public backBtn = element(by.id('back'));
    public record = element(by.css('.ag-body-container > div:first-of-type'));

    public customerIdField = element(by.css('.customerId'));
    public cityField = element(by.css('.city'));

    // check order property
    public firstFieldInForm = element(by.css('#dynamicForm > div:nth-of-type(1) input'));

    public cityEdit = element.all(by.xpath('.//*[.="city"]/preceding-sibling::div'))
        .get(2).element(by.id('editIcon'));
    public customerIdEdit = element.all(by.xpath(
        './/*[.="customerId"]/preceding-sibling::div')).get(2).element(by.id('editIcon'));

    public visibleInput = element(by.css('.visible'));
    public editableInput = element(by.css('.editable'));
    public orderInput = element(by.css('.order'));

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getCrudView() {
        browser.get(browser.baseUrl + '/customers');
    }

    hideProperty() {
        this.clickOnCityEdit();
        this.changeVisibleProperty();
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    }

    orderReadonlyProperty(value: string) {
        this.clickOnCustomerIdEdit();
        this.clearOrderInput();
        this.orderInput.sendKeys(value);
        this.changeEditableProperty();
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    }

    clearOrderInput() {
        browser.wait(EC.elementToBeClickable(this.orderInput), 5000,
            'orderInput not available');
        this.orderInput.clear();
    }

    isPresentCityField() {
        browser.wait(EC.presenceOf(this.cityField), 5000,
            'cityField not available');
        return this.cityField.isPresent();
    }

    isExistClass(str: string, className: string) {
        return str.indexOf(className) !== -1 ? true : false;
    }

    clickOnFormBtn() {
        browser.wait(EC.elementToBeClickable(this.formBtn), 5000,
            'formBtn not available');
        this.formBtn.click();
    }

    clickOnCityEdit() {
        browser.wait(EC.presenceOf(this.cityEdit), 5000,
            'cityEdit not available');
        this.cityEdit.click();
    }

    clickOnCustomerIdEdit() {
        browser.wait(EC.presenceOf(this.record), 5000,
            'customerIdEdit not available');
        this.customerIdEdit.click();
    }

    changeVisibleProperty() {
        browser.wait(EC.elementToBeClickable(this.visibleInput), 5000,
            'visibleInput not available');
        this.visibleInput.click();
    }

    changeEditableProperty() {
        browser.wait(EC.elementToBeClickable(this.editableInput), 5000,
            'editableInput not available');
        this.editableInput.click();
    }

    clickOnBackBtn() {
        browser.wait(EC.elementToBeClickable(this.backBtn), 5000,
            'backBtn not available');
        this.backBtn.click();
    }

    clickOnFormMetaData() {
        browser.wait(EC.elementToBeClickable(this.formMetaDataItem), 5000,
            'formMetaDataItem not available');
        this.formMetaDataItem.click();
    }

    clickOnMetaData() {
        browser.wait(EC.elementToBeClickable(this.metaDataItem), 5000,
            'metaDataItem not available');
        this.metaDataItem.click();
    }

    clickOnCustomers() {
        browser.wait(EC.elementToBeClickable(this.customersItem), 5000,
            'customersItem not available');
        this.customersItem.click();
    }

    clickOnBtnAddRecord() {
        browser.wait(EC.elementToBeClickable(this.btnAddRecord), 5000,
            'btnAddRecord not available');
        this.btnAddRecord.click();
    }

    isPresentFormMetaData() {
        browser.wait(EC.presenceOf(this.formMetaDataTag), 5000,
            'formMetaDataTag not available');
        return this.formMetaDataTag.isPresent();
    }

    isPresentLogo() {
        browser.wait(EC.presenceOf(this.logo), 5000,
            'logo not available');
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        browser.wait(EC.presenceOf(this.crudCreateTag), 5000,
            'crudCreateTag not available');
        return this.crudCreateTag.isPresent();
    }

    isPresentCustomers() {
        browser.wait(EC.presenceOf(this.customersTag), 5000,
            'customersTag not available');
        return this.customersTag.isPresent();
    }
}
