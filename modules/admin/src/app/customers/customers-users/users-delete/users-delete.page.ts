import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";

export class UsersDeletePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    rowUpdateButton = element.all(by.className('update-icon')).first();
    customerUsersTab = element(by.className('customer-users-tab'));
    deleteUserButton = element(by.css('#customer-users .items-container > div:last-child .delete-button'));
    customersUpdateSelector = element(by.tagName('customers-update'));
    usersDeleteSelector = element(by.tagName('users-delete'));
    messageTitle = element(by.css('simple-notification .sn-title'));
    pMessages = element(by.tagName('p-messages'));
    cancelButton = element(by.id('cancel-button'));
    okButton = element(by.id('ok-button'));

    get() {
        browser.get(browser.baseUrl + '/customers');
    }

    clickOnColumnCompanyName() {
        this.protHelper.clickOnElement(this.columnCompanyName);
    }

    clickOnRowUpdateButton() {
        this.protHelper.clickOnElement(this.rowUpdateButton);
    }

    clickOnCustomerUsersTab() {
        this.protHelper.clickOnElement(this.customerUsersTab);
    }

    clickOnDeleteUserButton() {
        this.protHelper.clickOnElement(this.deleteUserButton);
    }

    isDisplayedCustomersUpdateSelector() {
        return this.protHelper.isElementPresence(this.customersUpdateSelector);
    }

    isDisplayedDeleteSelector() {
        return this.protHelper.isElementPresence(this.usersDeleteSelector);
    }

    clickOnOkButton() {
        this.protHelper.clickOnElement(this.okButton);
    }

    getMessageTitle() {
        return this.protHelper.getElementText(this.messageTitle);
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
