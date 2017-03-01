import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";
import {promise as wdpromise} from "selenium-webdriver";

export class CustomersUpdatePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    rowUpdateButton = element.all(by.className('update-icon')).first();
    postcodeInputField = element(by.id('postcode'));
    messageTitle = element(by.css('simple-notification .sn-title'));
    submitButton = element(by.id('submit-button'));
    customersUpdateSelector = element(by.tagName('customers-update'));
    parentCustomerComponent = element(by.id('parent-customer'));
    customerContactsComponent = element(by.id('customer-contacts'));
    customerUserComponent = element(by.id('customer-users'));
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

    clickOnColumnCompanyName() {
        this.protHelper.clickOnElement(this.columnCompanyName);
    }

    clickOnRowUpdateButton() {
        this.protHelper.clickOnElement(this.rowUpdateButton);
    }

    sendKeysToPostcodeInputField() {
        this.protHelper.sendKeys(this.postcodeInputField, '32454');
    }

    getMessageTitle() {
        return this.protHelper.getElementText(this.messageTitle);
    }

    clickOnSubmitButton() {
        this.protHelper.clickOnElement(this.submitButton);
    }

    isDisplayedCustomersUpdateSelector() {
        return this.protHelper.isElementPresence(this.customersUpdateSelector);
    }

    isDisplayedParentCustomerComponent() {
        return this.protHelper.isElementPresence(this.parentCustomerComponent);
    }

    isDisplayedCustomerContactsComponent() {
        return this.protHelper.isElementPresence(this.customerContactsComponent);
    }

    isDisplayedCustomerUserComponent() {
        return this.protHelper.isElementPresence(this.customerUserComponent);
    }

    isDisplayedInputFields() {
        let isDisplayed: wdpromise.Promise<boolean>[] = [];
        this.inputFields.forEach(i => {
            isDisplayed.push(this.protHelper.isElementPresence(i.element));
        });
        return isDisplayed;
    }
}
