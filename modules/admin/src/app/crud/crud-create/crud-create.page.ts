import { InputElement } from '../../common/input-element';
import { EC } from '../../common/expected-conditions';
import { CrudPage } from '../crud.page';

export class CreatePage {
    public crudPage: CrudPage = new CrudPage();

    public hint = element(by.css('.companyName md-hint'));
    public contactsHint = element(by.css('.contacts .md-hint'));
    public usersHint = element(by.css('.users .md-hint'));
    public selectAll = element(by.id('select-all'));
    public addLinkBtn = element(by.id('addLink'));
    public btnAddRecord = element(by.id('addRow'));
    public formBtn = element(by.id('modify'));
    public backBtn = element(by.id('back'));
    public chooseFirstLinkElement = element(by.css(
        '.ag-body-container > div:first-of-type .ag-selection-checkbox'));

    public selectElements = {
        contacts: element(by.css('.contacts #add')),
        users: element(by.css('.users #add'))
    };

    public embeddedListElements = {
        type: element(by.className('type')),
        salutation: element(by.className('salutation'))
    };

    // first CRUD level
    public inputElementsOnFirstLevel: Array<InputElement> = [
        {
            nameElement: 'customerId',
            element: element(by.css('.customerId')), data: '1'
        },
        {
            nameElement: 'companyName',
            element: element(by.css('.companyName')), data: 'SMSC'
        },
        {
            nameElement: 'country',
            element: element(by.css('.country')), data: 'Ukraine'
        },
        {
            nameElement: 'city',
            element: element(by.css('.city')), data: 'Odessa'
        },
        {
            nameElement: 'postcode',
            element: element(by.css('.postcode')), data: '65000'
        },
        {
            nameElement: 'street',
            element: element(by.css('.street')), data: 'Pastera'
        },
        {
            nameElement: 'street2',
            element: element(by.css('.street2')), data: 'Tennistaya'
        },
        {
            nameElement: 'vatid',
            element: element(by.css('.vatid')), data: '465787'
        }
    ];

    // second CRUD level
    public inputElementsOnSecondLevel: Array<InputElement> = [
        {
            nameElement: 'firstname',
            element: element(by.css('.firstname ')), data: 'Josh'
        },
        {
            nameElement: 'surename',
            element: element(by.css('.surename ')), data: 'Tomas'
        },
        {
            nameElement: 'phone',
            element: element(by.css('.phone')), data: '43-458-05'
        },
        {
            nameElement: 'mobilePhone',
            element: element(by.css('.mobilePhone ')), data: '0975486397'
        },
        {
            nameElement: 'emailAddress',
            element: element(by.css('.emailAddress ')), data: 'polin@gmail.com'
        }
    ];

    constructor() {
    }

    isVisibleHint() {
        return this.hint.isPresent();
    }

    fillInputFields(inputElements: Array<InputElement>) {
        inputElements.forEach(i => {
            browser.wait(EC.elementToBeClickable(i.element), 5000);
            i.element.sendKeys(i.data);
        });
    }

    clickOnContacts() {
        browser.wait(EC.elementToBeClickable(this.selectElements.contacts), 5000);
        this.selectElements.contacts.click();
    }

    chooseContacts() {
        this.clickOnContacts();
        this.createRecordOnSecondLevel();
        this.chooseFirstLink();
    }

    chooseUsers() {
        browser.wait(EC.elementToBeClickable(this.selectElements.users), 5000);
        this.selectElements.users.click();
        this.chooseFirstLink();
        this.clickOnAddLinkBtn();
    }

    fillEmbeddedType() {
        browser.wait(EC.elementToBeClickable(this.embeddedListElements.type), 5000);
        this.embeddedListElements.type.click();

        let lastElement = element(by.css('.type option:last-of-type'));

        browser.wait(EC.elementToBeClickable(lastElement), 5000);
        lastElement.click();
    }

    fillEmbeddedSalutationType() {
        browser.wait(EC.elementToBeClickable(this.embeddedListElements.salutation), 5000);
        this.embeddedListElements.salutation.click();

        let lastElement = element(by.css('.salutation option:last-of-type'));

        browser.wait(EC.elementToBeClickable(lastElement), 5000);
        lastElement.click();
    }

    fillInputFieldsOnSecondLevel() {
        this.inputElementsOnSecondLevel.forEach(i => {
            browser.wait(EC.elementToBeClickable(i.element), 5000);
            i.element.sendKeys(i.data);
        });
    }

    sendKeysToEmailField() {
        let emailField = this.inputElementsOnSecondLevel[
            this.inputElementsOnSecondLevel.length - 1].element;
        let data = 'lui@beet.com';

        browser.wait(EC.elementToBeClickable(emailField), 5000);
        emailField.clear();
        emailField.sendKeys(data);
    }

    createRecordOnSecondLevel() {
        this.clickOnBtnAddRecord();
        this.fillInputFieldsOnSecondLevel();
        this.fillEmbeddedType();
        this.fillEmbeddedSalutationType();
        this.clickOnFormBtn();
        this.sendKeysToEmailField();
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    }

    clickOnContactsLinksetBtn() {
        browser.wait(EC.elementToBeClickable(this.selectElements.contacts), 5000);
        this.selectElements.contacts.click();
    }

    clickOnBackBtn() {
        browser.wait(EC.elementToBeClickable(this.backBtn), 5000);
        this.backBtn.click();
    }

    clickOnAddLinkBtn() {
        browser.wait(EC.elementToBeClickable(this.addLinkBtn), 5000);
        this.addLinkBtn.click();
    }

    clickOnSelectAll() {
        browser.wait(EC.elementToBeClickable(this.selectAll), 5000);
        this.selectAll.click();
    }

    clickOnBtnAddRecord() {
        browser.wait(EC.elementToBeClickable(this.btnAddRecord), 5000);
        this.btnAddRecord.click();
    }

    isEnabledFormButton() {
        browser.wait(EC.presenceOf(this.formBtn), 5000);
        return this.formBtn.isEnabled();
    }

    clickOnFormBtn() {
        browser.wait(EC.elementToBeClickable(this.formBtn), 5000);
        this.formBtn.click();
    }

    chooseFirstLink() {
        browser.wait(EC.elementToBeClickable(this.chooseFirstLinkElement), 5000);
        this.chooseFirstLinkElement.click();
    }

    isPresentContactsHint() {
        browser.wait(EC.presenceOf(this.contactsHint), 5000);
        return this.contactsHint.isPresent();
    }

    isPresentUsersHint() {
        browser.wait(EC.stalenessOf(this.usersHint), 5000);
        return this.usersHint.isPresent();
    }
}
