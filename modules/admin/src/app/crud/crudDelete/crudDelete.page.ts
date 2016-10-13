import { EC } from '../../common/expectedConditions';
import { CreatePage } from '../crudCreate/crudCreate.page';
import { CrudPage } from '../crud.page';

export class DeletePage {
    public crudCreate: CreatePage = new CreatePage();
    public crudPage: CrudPage = new CrudPage();

    public crudDelete = element(by.tagName('crud-delete'));
    public okBtn = element(by.id('ok'));

    constructor() {
    }

    isPresentCrudDelete() {
        browser.wait(EC.presenceOf(this.crudDelete), 5000);
        return this.crudDelete.isPresent();
    }

    clickOnOkBtn() {
        browser.wait(EC.elementToBeClickable(this.okBtn), 5000);
        this.okBtn.click();
    }

    deleteRecordsOnSecondLevel() {
        this.crudCreate.clickOnBtnAddRecord();
        this.crudCreate.clickOnContactsLinksetBtn();
        this.crudCreate.chooseFirstLink();
        this.crudPage.clickOnDeleteButton();
        this.clickOnOkBtn();
    }
}
