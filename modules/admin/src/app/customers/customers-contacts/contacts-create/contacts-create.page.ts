import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";

export class ContactsCreatePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    rowUpdateButton = element.all(by.className('update-icon')).first();
    customerContactsTab = element(by.className('customer-contacts-tab'));
    createContactButton = element(by.css('#customer-contacts .create-button'));
    customersUpdateSelector = element(by.tagName('customers-update'));
    contactsCreateSelector = element(by.tagName('contacts-create'));

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
}
