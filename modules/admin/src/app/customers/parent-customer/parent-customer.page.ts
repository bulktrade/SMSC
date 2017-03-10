import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class ParentCustomerPage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    rowUpdateButton = element.all(by.className('update-icon')).first();
    customersUpdateSelector = element(by.tagName('customers-update'));
    dropdownButton = element(by.css('.parent-customer button'));
    dropdownItems = element.all(by.css('.ui-autocomplete-items .ui-autocomplete-list-item'));
    buttonRemove = element(by.css('.parent-customer .btn-remove'));
    messageTitle = element(by.css('simple-notification .sn-title'));
    submitButton = element(by.id('submit-button'));

    get() {
        browser.get(browser.baseUrl + '/customers');
    }

    clickOnDropdownButton() {
        this.protHelper.clickOnElement(this.dropdownButton);
    }

    clickOnDropdownFirstItem() {
        this.protHelper.clickOnElement(this.dropdownItems.get(0));
    }

    clickOnButtonRemove() {
        this.protHelper.clickOnElement(this.buttonRemove);
    }

    isDisplayedButtonRemove() {
        return this.protHelper.isElementPresence(this.buttonRemove);
    }

    isDisplayedCustomersUpdateSelector() {
        return this.protHelper.isElementPresence(this.customersUpdateSelector);
    }

    clickOnRowUpdateButton() {
        this.protHelper.clickOnElement(this.rowUpdateButton);
    }

    clickOnColumnCompanyName() {
        this.protHelper.clickOnElement(this.columnCompanyName);
    }

    getMessageTitle() {
        return this.protHelper.getElementText(this.messageTitle);
    }
}
