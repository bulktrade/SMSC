import { LoginPage } from './login.page';
import { WaitUntil } from './common/waitUntilReady';

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

    public companyNameField = element(by.css('.companyName input'));
    public countryField = element(by.css('.country input'));

    // check order property
    public firstFieldInForm = element(by.css('#dynamicForm > div:nth-of-type(1) md-input'));

    public countryEdit = element(by.css('.ag-body-container > div:nth-of-type(7) .editIcon'));
    public companyNameEdit = element(by.css('.ag-body-container > div:nth-of-type(5) .editIcon'));
    public customerIdEdit = element(by.css('.ag-body-container > div:nth-of-type(10) .editIcon'));

    public visibleInput = element(by.css('.visible'));
    public editableInput = element(by.css('.editable'));
    public orderInput = element(by.css('.order input'));

    private _ptor;

    constructor() {
    }

    get() {
        browser.get('/admin');
    }

    getCrudView() {
        browser.get('/admin/customers');
    }

    hideProperty() {
        this.clickOnCountryEdit();
        this.changeVisibleProperty();
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    }

    readonlyProperty() {
        this.clickOnCompanyNameEdit();
        this.changeEditableProperty();
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    }

    orderProperty(value: string) {
        this.clickOnCustomerIdEdit();
        this.clearOrderInput();
        this.orderInput.sendKeys(value);
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    }

    clearOrderInput() {
        WaitUntil.waitUntil(this.orderInput, this._ptor);
        this.orderInput.clear();
    }

    isPresentCountryField(ready: boolean) {
        WaitUntil.waitUntil(this.countryField, this._ptor, ready);
        return this.countryField.isPresent();
    }

    isExistClass(str: string, className: string) {
        return str.indexOf(className) !== -1 ? true : false;
    }

    clickOnFormBtn() {
        WaitUntil.waitUntil(this.formBtn, this.ptor);
        this.formBtn.click();
    }

    clickOnCountryEdit() {
        WaitUntil.waitUntil(this.countryEdit, this._ptor);
        this.countryEdit.click();
    }

    clickOnCompanyNameEdit() {
        WaitUntil.waitUntil(this.companyNameEdit, this._ptor);
        this.companyNameEdit.click();
    }

    clickOnCustomerIdEdit() {
        WaitUntil.waitUntil(this.customerIdEdit, this._ptor);
        this.customerIdEdit.click();
    }

    changeVisibleProperty() {
        WaitUntil.waitUntil(this.visibleInput, this._ptor);
        this.visibleInput.click();
    }

    changeEditableProperty() {
        WaitUntil.waitUntil(this.editableInput, this._ptor);
        this.editableInput.click();
    }

    clickOnBackBtn() {
        WaitUntil.waitUntil(this.backBtn, this.ptor);
        this.backBtn.click();
    }

    clickOnFormMetaData() {
        WaitUntil.waitUntil(this.formMetaDataItem, this.ptor);
        this.formMetaDataItem.click();
    }


    clickOnMetaData() {
        WaitUntil.waitUntil(this.metaDataItem, this.ptor);
        this.metaDataItem.click();
    }

    clickOnCustomers() {
        WaitUntil.waitUntil(this.customersItem, this.ptor);
        this.customersItem.click();
    }

    clickOnBtnAddRecord() {
        WaitUntil.waitUntil(this.btnAddRecord, this.ptor);
        this.btnAddRecord.click();
    }

    isPresentFormMetaData() {
        WaitUntil.waitUntil(this.formMetaDataTag, this.ptor);
        return this.formMetaDataTag.isPresent();
    }

    isPresentLogo() {
        WaitUntil.waitUntil(this.logo, this.ptor);
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        WaitUntil.waitUntil(this.crudCreateTag, this.ptor);
        return this.crudCreateTag.isPresent();
    }

    isPresentCustomers() {
        WaitUntil.waitUntil(this.customersTag, this.ptor);
        return this.customersTag.isPresent();
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
