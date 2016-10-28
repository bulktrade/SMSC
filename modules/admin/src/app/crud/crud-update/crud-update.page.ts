import { EC } from '../../common/expected-conditions';
import { CreatePage } from '../crud-create/crud-create.page';
import { CrudPage } from '../crud.page';

export class UpdatePage {
    public crudCreate: CreatePage = new CreatePage();
    public crudPage: CrudPage = new CrudPage();

    public editIcon = element(by.css('.ag-body-container > div:first-of-type .editIcon'));
    public updateDirective = element(by.tagName('crud-update'));
    public editableField = element(by.css('.customerId input'));
    public formBtn = element(by.id('modify'));

    constructor() {
    }

    clickOnEditIcon() {
        browser.wait(EC.elementToBeClickable(this.editIcon), 5000);
        this.editIcon.click();
    }

    sentKeysToEditableField() {
        browser.wait(EC.elementToBeClickable(this.editableField), 5000);
        this.editableField.clear();
        this.editableField.sendKeys('2');
    }

    clickOnFormBtn() {
        browser.wait(EC.elementToBeClickable(this.formBtn), 5000);
        this.formBtn.click();
    }

    isPresentUpdateDirective() {
        browser.wait(EC.presenceOf(this.updateDirective), 5000);
        return this.updateDirective.isPresent();
    }
}
