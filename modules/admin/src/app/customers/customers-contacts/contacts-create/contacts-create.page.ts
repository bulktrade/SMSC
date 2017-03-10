import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";
import {promise as wdpromise} from "selenium-webdriver";

export class ContactsCreatePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    rowUpdateButton = element.all(by.className('update-icon')).first();
    customerContactsTab = element(by.className('customer-contacts-tab'));
    createContactButton = element(by.css('#customer-contacts .create-button'));
    customersUpdateSelector = element(by.tagName('customers-update'));
    contactsCreateSelector = element(by.tagName('contacts-create'));
    submitButton = element(by.id('submit-button'));
    salutationDropdown = element(by.id('salutation'));
    salutationLabel = element(by.css('#salutation label'));
    typeDropdown = element(by.id('type'));
    messageTitle = element(by.css('simple-notification .sn-title'));
    typeLabel = element(by.css('#type label'));
    inputFields = [
        {
            element: element(by.id('firstname')),
            value: 'firstname'
        },
        {
            element: element(by.id('surname')),
            value: 'surname'
        },
        {
            element: element(by.id('phone')),
            value: 'phone'
        },
        {
            element: element(by.id('mobilePhone')),
            value: 'mobilePhone'
        },
        {
            element: element(by.id('fax')),
            value: 'fax'
        },
        {
            element: element(by.id('emailAddress')),
            value: 'email@address.io'
        }
    ];

    get() {
        browser.get(browser.baseUrl + '/customers');
    }

    clickOnColumnCompanyName() {
        this.protHelper.clickOnElement(this.columnCompanyName);
    }

    clickOnRowUpdateButton() {
        this.protHelper.clickOnElement(this.rowUpdateButton);
    }

    clickOnCustomerContactsTab() {
        this.protHelper.clickOnElement(this.customerContactsTab);
    }

    clickOnCreateContactButton() {
        this.protHelper.clickOnElement(this.createContactButton);
    }

    isDisplayedCustomersUpdateSelector() {
        return this.protHelper.isElementPresence(this.customersUpdateSelector);
    }

    isDisplayedContactsCreateSelector() {
        return this.protHelper.isElementPresence(this.contactsCreateSelector);
    }

    // set salutation dropdown field
    setSalutation() {
        let dropdownLastElement = element(by.css('#salutation ul > li:last-child'));
        this.protHelper.clickOnElement(this.salutationDropdown); // click on the salutation dropdown
        this.protHelper.clickOnElement(dropdownLastElement); // choose the last one
    }

    // set type dropdown field
    setType() {
        let dropdownLastElement = element(by.css('#type ul > li:last-child'));
        this.protHelper.clickOnElement(this.typeDropdown); // click on the type dropdown
        this.protHelper.clickOnElement(dropdownLastElement); // choose the last one
    }

    isDisplayedInputFields() {
        let isDisplayed: wdpromise.Promise<boolean>[] = [];
        this.inputFields.forEach(i => {
            isDisplayed.push(this.protHelper.isElementPresence(i.element));
        });
        return isDisplayed;
    }

    getSalutationLabelText() {
        return this.protHelper.getElementText(this.salutationLabel);
    }

    getTypeLabelText() {
        return this.protHelper.getElementText(this.typeLabel);
    }

    fillInputFields() {
        this.inputFields.forEach(i => {
            this.protHelper.sendKeys(i.element, i.value);
        });
    }

    isEnabledSubmitButton() {
        return this.protHelper.isEnabledElement(this.submitButton);
    }

    clickOnSubmitButton() {
        this.protHelper.clickOnElement(this.submitButton);
    }

    getMessageTitle() {
        return this.protHelper.getElementText(this.messageTitle);
    }
}
