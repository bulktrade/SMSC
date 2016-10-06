import { EC } from "../../common/expectedConditions";
import {LoginPage} from "../../login/login.page";
import {CreatePage} from "../../crud/crudCreate/crudCreate.page";
import {DeletePage} from "../../crud/crudDelete/crudDelete.page";

export class CrudPage {
    public login: LoginPage = new LoginPage();
    public crudCreate: CreatePage = new CreatePage();
    public crudDelete: DeletePage = new DeletePage();

    public logo = element(by.id('logo'));
    public notification = element(by.id('notificationBox'));
    public customersItem = element(by.className('customers'));
    public customersTag = element(by.tagName('customers'));
    public metaDataItem = element(by.className('crudmetadata'));
    public gridMetaDataItem = element(by.className('crudmetagriddata'));
    public formMetaDataItem = element(by.className('crudmetaformdata'));
    public gridMetaDataTag = element(by.tagName('crudMetaGridData'));
    public formMetaDataTag = element(by.tagName('crudMetaFormData'));
    public btnAddRecord = element(by.id('addRow'));
    public crudCreateTag = element(by.tagName('crud-create'));
    public crudViewTag = element(by.tagName('crud-view'));
    public btnDeleteRow = element(by.id('deleteRecord'));
    public backBtn = element(by.id('back'));
    public record = element(by.css('.ag-body-container > div:first-of-type'));
    public editIcon = element(by.css('.ag-body-container > div:first-of-type .editIcon'));
    public records = element.all(by.css('.ag-body-container > div'));
    public searchPanel = element(by.className('searchPanel'));
    public chooseFirstLinkElement = element(by.css(
        '.ag-body-container > div:first-of-type .ag-selection-checkbox'));

    private _ptor;

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getCrudView() {
        browser.get(browser.baseUrl + '/customers');
    }

    isPresentRecord() {
        browser.wait(EC.presenceOf(this.record), 5000);
        return this.records.isDisplayed();
    }

    getSizeRecords() {
        browser.wait(EC.presenceOf(this.record), 5000);
        return this.records.count();
    }

    deleteRecordsOnSecondLevel() {
        this.clickOnBtnAddRecord();
        this.crudCreate.clickOnContactsLinksetBtn();
        this.crudCreate.chooseFirstLink();
        this.clickOnDeleteButton();
        this.crudDelete.clickOnOkBtn();
    }

    isEnabledDeleteButton() {
        browser.wait(EC.presenceOf(this.btnDeleteRow), 5000);
        return this.btnDeleteRow.isEnabled();
    }

    clickOnDeleteButton() {
        browser.wait(EC.presenceOf(this.btnDeleteRow), 5000);
        this.btnDeleteRow.click();
    }

    chooseFirstLink() {
        browser.wait(EC.presenceOf(this.chooseFirstLinkElement), 5000);
        this.chooseFirstLinkElement.click();
    }

    clickOnBackBtn() {
        browser.wait(EC.presenceOf(this.backBtn), 5000);
        this.backBtn.click();
    }

    clickOnGridMetaData() {
        browser.wait(EC.presenceOf(this.gridMetaDataItem), 5000);
        this.gridMetaDataItem.click();
    }

    clickOnFormMetaData() {
        browser.wait(EC.presenceOf(this.formMetaDataItem), 5000);
        this.formMetaDataItem.click();
    }

    clickOnMetaData() {
        browser.wait(EC.presenceOf(this.metaDataItem), 5000);
        this.metaDataItem.click();
    }

    clickOnCustomers() {
        browser.wait(EC.presenceOf(this.customersItem), 5000);
        this.customersItem.click();
    }

    clickOnBtnAddRecord() {
        browser.wait(EC.presenceOf(this.btnAddRecord), 5000);
        this.btnAddRecord.click();
    }

    clickOnEditIcon() {
        browser.wait(EC.presenceOf(this.editIcon), 5000);
        this.editIcon.click();
    }

    isPresentGridMetaData() {
        browser.wait(EC.presenceOf(this.gridMetaDataTag), 5000);
        return this.gridMetaDataTag.isPresent();
    }

    isPresentFormMetaData() {
        browser.wait(EC.presenceOf(this.formMetaDataTag), 5000);
        return this.formMetaDataTag.isPresent();
    }

    isPresentLogo() {
        browser.wait(EC.presenceOf(this.logo), 5000);
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        browser.wait(EC.presenceOf(this.crudCreateTag), 5000);
        return this.crudCreateTag.isPresent();
    }

    isPresentCrudViewTag() {
        browser.wait(EC.presenceOf(this.crudViewTag), 5000);
        return this.crudViewTag.isPresent();
    }

    isPresentNotification() {
        browser.wait(EC.presenceOf(this.notification), 5000);
        return this.notification.isPresent();
    }

    isPresentCustomers() {
        browser.wait(EC.presenceOf(this.customersTag), 5000);
        return this.customersTag.isPresent();
    }

    isDisplayedSearchPanel() {
        browser.wait(EC.presenceOf(this.searchPanel), 5000);
        return this.searchPanel.isPresent();
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
