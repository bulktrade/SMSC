import { EC } from "../../common/expectedConditions";

export class DeletePage {
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
}
