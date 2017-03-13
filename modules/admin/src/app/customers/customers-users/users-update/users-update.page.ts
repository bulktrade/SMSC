import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";
import {promise as wdpromise} from "selenium-webdriver";

export class UsersUpdatePage {
    protHelper = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    rowUpdateButton = element.all(by.className('update-icon')).first();
    customerUsersTab = element(by.className('customer-users-tab'));
    updateUserButton = element(by.css('#customer-users .items-container > div:last-child .update-button'));
    customersUpdateSelector = element(by.tagName('customers-update'));
    usersUpdateSelector = element(by.tagName('users-update'));
    submitButton = element(by.id('submit-button'));
    salutationDropdown = element(by.id('salutation'));
    salutationLabel = element(by.css('#salutation label'));
    messageTitle = element(by.css('simple-notification .sn-title'));
    activeCheckbox = element(by.id('active'));
    blockedCheckbox = element(by.id('blocked'));
    inputFields = [
        {
            element: element(by.id('username')),
            value: 'username'
        },
        {
            element: element(by.id('firstname')),
            value: 'firstname'
        },
        {
            element: element(by.id('surname')),
            value: 'surname'
        },
        {
            element: element(by.id('username')),
            value: 'username'
        },
        {
            element: element(by.id('email')),
            value: 'email@address.io'
        },
        {
            element: element(by.id('password')),
            value: 'password'
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

    clickOnCustomerUsersTab() {
        this.protHelper.clickOnElement(this.customerUsersTab);
    }

    clickOnUpdateUserButton() {
        this.protHelper.clickOnElement(this.updateUserButton);
    }

    isDisplayedCustomersUpdateSelector() {
        return this.protHelper.isElementPresence(this.customersUpdateSelector);
    }

    isDisplayedUsersUpdateSelector() {
        return this.protHelper.isElementPresence(this.usersUpdateSelector);
    }

    // set salutation dropdown field
    setSalutation() {
        let dropdownLastElement = element(by.css('#salutation ul > li:last-child'));
        this.protHelper.clickOnElement(this.salutationDropdown); // click on the salutation dropdown
        this.protHelper.clickOnElement(dropdownLastElement); // choose the last one
    }

    clickOnActiveCheckbox() {
        this.protHelper.clickOnElement(this.activeCheckbox);
    }

    clickOnBlockedCheckbox() {
        this.protHelper.clickOnElement(this.blockedCheckbox);
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
