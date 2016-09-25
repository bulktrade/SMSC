import { LoginPage } from "./login.page";
import { WaitUntilReady } from "./common/waitUntilReady";
import { CreatePage } from "./crud/crud.create.page";
import { DeletePage } from "./crud/crud.delete.page";
import { InputElement } from "./model/inputElement";

export class CrudPage {
    public login: LoginPage = new LoginPage();
    public crudCreate: CreatePage = new CreatePage();
    public crudDelete: DeletePage = new DeletePage();
    private _ptor;

    public logo = element(by.id('logo'));
    public customersItem = element(by.className('customers'));
    public customersTag = element(by.tagName('customers'));
    public btnAddRecord = element(by.id('addRow'));
    public crudCreateTag = element(by.tagName('crud-create'));
    public btnDeleteRow = element(by.id('deleteRow'));
    public backBtn = element(by.id('back'));

    constructor() {
    }

    get() {
        browser.get('/admin');
    }

    isEnabledDeleteButton() {
        WaitUntilReady.waitUntilReady(this.btnDeleteRow, this.ptor);
        return this.btnDeleteRow.isEnabled();
    }

    clickOnDeleteButton() {
        WaitUntilReady.waitUntilReady(this.btnDeleteRow, this.ptor);
        return this.btnDeleteRow.click();
    }

    clickOnBackBtn() {
        WaitUntilReady.waitUntilReady(this.backBtn, this.ptor);
        this.backBtn.click();
    }

    clickOnCustomers() {
        WaitUntilReady.waitUntilReady(this.customersItem, this.ptor);
        this.customersItem.click();
    }

    clickOnBtnAddRecord() {
        WaitUntilReady.waitUntilReady(this.btnAddRecord, this.ptor);
        this.btnAddRecord.click();
    }

    isPresentLogo() {
        WaitUntilReady.waitUntilReady(this.logo, this.ptor);
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        WaitUntilReady.waitUntilReady(this.crudCreateTag, this.ptor);
        return this.crudCreateTag.isPresent();
    }

    isPresentCustomers() {
        WaitUntilReady.waitUntilReady(this.customersTag, this.ptor);
        return this.customersTag.isPresent();
    }

    /** getters and setters **/

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}