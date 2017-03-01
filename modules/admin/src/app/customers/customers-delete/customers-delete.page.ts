import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class CustomersDeletePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    rowDeleteButton = element.all(by.className('delete-icon')).first();
    customersDeleteSelector = element(by.tagName('customers-delete'));
    messageTitle = element(by.css('simple-notification .sn-title'));
    submitButton = element(by.id('submit-button'));
    pMessages = element(by.tagName('p-messages'));
    cancelButton = element(by.id('cancel-button'));
    okButton = element(by.id('ok-button'));

    get() {
        browser.get(browser.baseUrl + '/customers');
    }

    clickOnColumnCompanyName() {
        this.protHelper.clickOnElement(this.columnCompanyName);
    }

    clickOnRowDeleteButton() {
        this.protHelper.clickOnElement(this.rowDeleteButton);
    }

    getMessageTitle() {
        return this.protHelper.getElementText(this.messageTitle);
    }

    clickOnSubmitButton() {
        this.protHelper.clickOnElement(this.okButton);
    }

    isDisplayedCustomersDeleteSelector() {
        return this.protHelper.isElementPresence(this.customersDeleteSelector);
    }

    isDisplayedMessage() {
        return this.protHelper.isElementPresence(this.pMessages);
    }

    isDisplayedCancelButton() {
        return this.protHelper.isElementPresence(this.cancelButton);
    }

    isDisplayedOkButton() {
        return this.protHelper.isElementPresence(this.okButton);
    }
}
