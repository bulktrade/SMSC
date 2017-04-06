import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class MCCDeletePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    globalFilter = element(by.className('global-filter'));
    rowDeleteButton = element.all(by.className('delete-icon')).first();
    mccDeleteSelector = element(by.tagName('mcc-delete'));
    messageTitle = element(by.css('simple-notification .sn-title'));
    submitButton = element(by.id('submit-button'));
    pMessages = element(by.tagName('p-messages'));
    cancelButton = element(by.id('cancel-button'));
    okButton = element(by.id('ok-button'));

    get() {
        browser.get(browser.baseUrl + '/mcc');
    }

    sendKeysToGlobalFilter() {
        this.protHelper.sendKeys(this.globalFilter, '100000000');
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

    isDisplayedMCCDeleteSelector() {
        return this.protHelper.isElementPresence(this.mccDeleteSelector);
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
