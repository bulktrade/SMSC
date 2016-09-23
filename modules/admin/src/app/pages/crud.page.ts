import { LoginPage } from "./login.page";
import { WaitUntilReady } from "./common/waitUntilReady";
import { CreatePage } from "./crud/crud.create.page";
import { DeletePage } from "./crud/crud.delete.page";

export class CrudPage {
    public login: LoginPage = new LoginPage();
    public crudCreate: CreatePage = new CreatePage();
    public crudDelete: DeletePage = new DeletePage();
    private _ptor;

    public logo = element(by.id('logo'));
    public customersItem = element(by.className('customers'));
    public customersTag = element(by.tagName('customers'));
    public crudCreateTag = element(by.tagName('crud-create'));
    public btnAddRecord = element(by.id('addRow'));
    public formBtn = element(by.id('modify'));
    public btnDeleteRow = element(by.id('deleteRow'));
    public backBtn = element(by.id('back'));

    constructor() {
    }

    fillInputFields() {
        let inputData = {
            customersId: 1,
            companyName: 'SMSC',
            street2: 'Pastera',
            city: 'Tennistaya',
            postcode: 65000,
            street: 'Ukraine',
            country: 'Odessa',
            vatid: 465787
        };

        for (let i in this.crudCreate.inputElements) {
            this.crudCreate.inputElements[i].sendKeys(inputData[i]);
        }
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

    clickOnFormBtn() {
        WaitUntilReady.waitUntilReady(this.formBtn, this.ptor);
        this.formBtn.click();
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