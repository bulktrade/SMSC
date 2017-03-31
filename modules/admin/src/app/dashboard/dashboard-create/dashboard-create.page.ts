import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class DashboardCreatePage {
    public protHelpers = new ProtractorHelpers();

    splitButton = element(by.className('ui-splitbutton-menubutton'));
    createDashboardButton = element(by.css('.ui-menu-list > li:first-child'));
    dashboardForm = element(by.tagName('dashboard-create'));
    nameInputField = element(by.id('name'));
    iconInputField = element(by.id('icon'));
    submitButton = element(by.id('submit-button'));
    notificationTitle = element(by.css('simple-notification .sn-title'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    fillInputFields() {
        this.protHelpers.isElementPresence(this.nameInputField);
        this.protHelpers.isElementPresence(this.iconInputField);
        this.nameInputField.clear();
        this.nameInputField.sendKeys('Statistics');
        this.iconInputField.clear();
        this.iconInputField.sendKeys('fa-rocket');
    }

    clickOnSplitButton() {
        this.protHelpers.clickOnElement(this.splitButton);
    }

    clickOnCreateDashboardButton() {
        this.protHelpers.clickOnElement(this.createDashboardButton);
    }

    clickOnSubmitButton() {
        this.protHelpers.clickOnElement(this.submitButton);
    }

    isDisplayDashboardForm() {
        return this.protHelpers.isElementPresence(this.dashboardForm);
    }

    getNotificationTitleTitle() {
        return this.protHelpers.getElementText(this.notificationTitle);
    }
}
