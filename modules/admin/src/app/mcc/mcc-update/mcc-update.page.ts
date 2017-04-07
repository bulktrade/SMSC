import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class MCCUpdatePage {
    public protHelpers = new ProtractorHelpers();

    columnMCC = element(by.cssContainingText('.ui-column-title', 'MCC'));
    globalFilter = element(by.className('global-filter'));
    rowUpdateButton = element.all(by.className('update-icon')).first();
    mccForm = element(by.tagName('mcc-update'));
    mccInputField = element(by.id('mcc'));
    codeInputField = element(by.id('code'));
    countryInputField = element(by.id('country'));
    submitButton = element(by.id('submit-button'));
    notificationTitle = element(by.css('simple-notification .sn-title'));

    get() {
        browser.get(browser.baseUrl + '/mcc');
    }

    fillInputFields() {
        this.protHelpers.isElementPresence(this.mccInputField);
        this.protHelpers.isElementPresence(this.codeInputField);
        this.protHelpers.isElementPresence(this.countryInputField);
        this.mccInputField.clear();
        this.mccInputField.sendKeys('100000000');
        this.codeInputField.clear();
        this.codeInputField.sendKeys('243');
        this.countryInputField.clear();
        this.countryInputField.sendKeys('Changed country');
    }

    clickOnColumnMCC() {
        this.protHelpers.clickOnElement(this.columnMCC);
    }

    isEnabledSubmitButton() {
        return this.protHelpers.isEnabledElement(this.submitButton);
    }

    sendKeysToGlobalFilter() {
        this.protHelpers.sendKeys(this.globalFilter, '1000000000');
    }

    clickOnRowUpdateButton() {
        this.protHelpers.clickOnElement(this.rowUpdateButton);
    }

    clickOnSubmitButton() {
        this.protHelpers.clickOnElement(this.submitButton);
    }

    isDisplayMCCForm() {
        return this.protHelpers.isElementPresence(this.mccForm);
    }

    getNotificationTitleTitle() {
        return this.protHelpers.getElementText(this.notificationTitle);
    }
}
