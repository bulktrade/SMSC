import { LoginPage } from './login.page';
import { WaitUntil } from './common/waitUntilReady';
import { CreatePage } from './crud/crud.create.page';
import { DeletePage } from './crud/crud.delete.page';

export class CrudPage {
    public login: LoginPage = new LoginPage();
    public crudCreate: CreatePage = new CreatePage();
    public crudDelete: DeletePage = new DeletePage();

    public logo = element(by.id('logo'));
    public customersItem = element(by.className('customers'));
    public customersTag = element(by.tagName('customers'));
    public metaDataItem = element(by.className('crudmetadata'));
    public gridMetaDataItem = element(by.className('crudmetagriddata'));
    public gridMetaDataTag = element(by.tagName('crudMetaGridData'));
    public btnAddRecord = element(by.id('addRow'));
    public crudCreateTag = element(by.tagName('crud-create'));
    public crudViewTag = element(by.tagName('crud-view'));
    public btnDeleteRow = element(by.id('deleteRow'));
    public backBtn = element(by.id('back'));

    private _ptor;

    constructor() {
    }

    get() {
        browser.get('/admin');
    }

    getCrudView() {
        browser.get('/admin/customers');
    }

    isEnabledDeleteButton() {
        WaitUntil.waitUntil(this.btnDeleteRow, this.ptor);
        return this.btnDeleteRow.isEnabled();
    }

    clickOnDeleteButton() {
        WaitUntil.waitUntil(this.btnDeleteRow, this.ptor);
        return this.btnDeleteRow.click();
    }

    clickOnBackBtn() {
        WaitUntil.waitUntil(this.backBtn, this.ptor);
        this.backBtn.click();
    }

    clickOnGridMetaData() {
        WaitUntil.waitUntil(this.gridMetaDataItem, this.ptor);
        this.gridMetaDataItem.click();
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

    isPresentGridMetaData() {
        WaitUntil.waitUntil(this.gridMetaDataTag, this.ptor);
        return this.gridMetaDataTag.isPresent();
    }

    isPresentLogo() {
        WaitUntil.waitUntil(this.logo, this.ptor);
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        WaitUntil.waitUntil(this.crudCreateTag, this.ptor);
        return this.crudCreateTag.isPresent();
    }

    isPresentCrudViewTag() {
        WaitUntil.waitUntil(this.crudViewTag, this.ptor);
        return this.crudViewTag.isPresent();
    }

    isPresentCustomers() {
        WaitUntil.waitUntil(this.customersTag, this.ptor);
        return this.customersTag.isPresent();
    }

    // getters and setters

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
