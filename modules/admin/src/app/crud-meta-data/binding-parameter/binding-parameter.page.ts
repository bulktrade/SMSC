import { EC } from '../../common/expected-conditions';
import { CrudPage } from '../../crud/crud.page';
import { CreatePage } from '../../crud/crud-create/crud-create.page';

export class BindingParameterPage {
    public crudPage: CrudPage = new CrudPage();
    public crudCreate: CreatePage = new CreatePage();

    public bindingParameterItem = element(by.className('metadatapropertybindingparameter'));
    public bindingParameterDirective = element(by.tagName('binding-parameter'));

    public fromPropertyField = element(by.css('.fromProperty input'));
    public toPropertyField = element(by.css('.toProperty input'));
    public combineOperatorSelect = element(by.className('combineOperator'));
    public operatorSelect = element(by.className('operator'));
    public bingingPropertiesSelect = element(by.css('.bingingProperties #add'));
    public chooseFirstLinkElement = element(by.css(
        '.ag-body-container > div:first-of-type .ag-selection-checkbox'));
    public addLinkBtn = element(by.id('addLink'));

    public contactsEdit = element.all(by.xpath('.//*[.="contacts"]/preceding-sibling::div'))
        .get(2).element(by.id('editIcon'));

    fillForm() {
        this.sendKeysFromPropertyField('customer');
        this.sendKeysToPropertyField('@rid');
        this.chooseCombineOperatorSelect();
        this.chooseOperatorSelect();
    }

    chooseCombineOperatorSelect() {
        browser.wait(EC.elementToBeClickable(this.combineOperatorSelect), 5000);
        this.combineOperatorSelect.click();


        let lastElement = element(by.css('.combineOperator option:nth-of-type(2)'));

        browser.wait(EC.elementToBeClickable(lastElement), 5000);
        lastElement.click();
    }

    chooseOperatorSelect() {
        browser.wait(EC.elementToBeClickable(this.operatorSelect), 5000);
        this.operatorSelect.click();


        let lastElement = element(by.css('.operator option:nth-of-type(2)'));

        browser.wait(EC.elementToBeClickable(lastElement), 5000);
        lastElement.click();
    }

    clickOnContactsEdit() {
        return this.contactsEdit.click();
    }

    chooseBindingParameter() {
        browser.wait(EC.elementToBeClickable(this.bingingPropertiesSelect), 5000);
        this.bingingPropertiesSelect.click();
        this.chooseFirstLink();
        this.clickOnAddLinkBtn();
    }

    clickOnAddLinkBtn() {
        browser.wait(EC.elementToBeClickable(this.addLinkBtn), 5000);
        this.addLinkBtn.click();
    }

    chooseFirstLink() {
        browser.wait(EC.elementToBeClickable(this.chooseFirstLinkElement), 5000);
        this.chooseFirstLinkElement.click();
    }

    sendKeysFromPropertyField(value) {
        browser.wait(EC.elementToBeClickable(this.fromPropertyField), 5000);
        this.fromPropertyField.sendKeys(value);
    }

    sendKeysToPropertyField(value) {
        browser.wait(EC.elementToBeClickable(this.toPropertyField), 5000);
        this.toPropertyField.sendKeys(value);
    }

    isDisplayedBindingParameterDirective() {
        browser.wait(EC.presenceOf(this.bindingParameterDirective), 5000);
        return this.bindingParameterDirective.isPresent();
    }

    clickOnBindingParameterItem() {
        browser.wait(EC.elementToBeClickable(this.bindingParameterItem), 5000);
        this.bindingParameterItem.click();
    }
}
