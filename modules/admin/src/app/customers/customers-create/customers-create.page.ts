import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";
import {promise as wdpromise} from "selenium-webdriver";

export class CustomersCreatePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    customersViewCreateButton = element(by.className('create-button'));
    submitButton = element(by.id('submit-button'));
    customersUpdateSelector = element(by.tagName('customers-update'));
    successfulMessage = element(by.tagName('simple-notification'));
    customersForm = element(by.id('customers-form'));
    inputFields = [
        {
            element: element(by.id('companyName')),
            value: 'Aaaaaaaaaaaaaaaa'
        },
        {
            element: element(by.id('street')),
            value: 'street'
        },
        {
            element: element(by.id('street2')),
            value: 'street2'
        },
        {
            element: element(by.id('postcode')),
            value: 'postcode'
        },
        {
            element: element(by.id('country')),
            value: 'country'
        },
        {
            element: element(by.id('city')),
            value: 'city'
        },
        {
            element: element(by.id('vatid')),
            value: 'vatid'
        }
    ];

    get() {
        browser.get(browser.baseUrl + '/customers');
    }

    clickOnCustomersViewCreateButton() {
        this.protHelper.clickOnElement(this.customersViewCreateButton);
    }

    clickOnSubmitButton() {
        this.protHelper.clickOnElement(this.submitButton);
    }

    fillInputFields(valueSuffix: number) {
        this.inputFields.forEach(i => {
            this.protHelper.sendKeys(i.element, i.value + valueSuffix);
        });
    }

    isEnabledSubmitButton() {
        return this.protHelper.isEnabledElement(this.submitButton);
    }

    isDisplayedCustomersForm() {
        return this.protHelper.isElementPresence(this.customersForm);
    }

    isDisplayedSuccessfulMessage() {
        return this.protHelper.isElementPresence(this.successfulMessage);
    }

    isDisplayedCustomersUpdateSelector() {
        return this.protHelper.isElementPresence(this.customersUpdateSelector);
    }

    isDisplayedInputFields() {
        let isDisplayed: wdpromise.Promise<boolean>[] = [];
        this.inputFields.forEach(i => {
            isDisplayed.push(this.protHelper.isElementPresence(i.element));
        });
        return isDisplayed;
    }
}
