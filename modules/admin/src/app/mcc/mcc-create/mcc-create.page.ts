import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class MCCCreatePage {
    public protHelpers = new ProtractorHelpers();

    createButton = element(by.className('create-button'));
    mccForm = element(by.tagName('mcc-create'));
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
        this.mccInputField.sendKeys('1000000000');
        this.codeInputField.clear();
        this.codeInputField.sendKeys('263');
        this.countryInputField.clear();
        this.countryInputField.sendKeys('Country');
    }

    isEnabledSubmitButton() {
        return this.protHelpers.isEnabledElement(this.submitButton);
    }

    clickOnCreateButton() {
        this.protHelpers.clickOnElement(this.createButton);
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
