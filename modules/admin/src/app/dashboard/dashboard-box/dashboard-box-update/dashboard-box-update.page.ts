import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";

export class DashboardBoxUpdatePage {
    public protHelpers = new ProtractorHelpers();

    dashboardsSidebarItem = element(by.className('dashboards'));
    lastDashboard = element(by.css('.dashboard-boxes > dashboard-box:last-child'));
    updateDashboardButton = this.lastDashboard.element(by.className('btn-update-box'));
    dashboardBoxForm = element(by.tagName('dashboard-box-update'));

    nameInputField = this.lastDashboard.element(by.id('name'));
    descriptionInputField = this.lastDashboard.element(by.id('description'));
    widthInputField = this.lastDashboard.element(by.id('width'));
    heightInputField = this.lastDashboard.element(by.id('height'));

    submitButton = this.lastDashboard.element(by.id('submit-button'));
    notificationTitle = element(by.css('simple-notification .sn-title'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    fillInputFields() {
        // send keys to the name input field
        this.protHelpers.sendKeys(this.nameInputField, 'Changed dashboard');
        // this.nameInputField.sendKeys('Changed dashboard');

        // send keys to the description input field
        this.protHelpers.sendKeys(this.descriptionInputField, 'changed dashboard');

        // choose the first option of the dropdown with the with of the box
        this.protHelpers.clickOnElement(this.widthInputField);
        this.protHelpers.clickOnElement(element(by.css('#width .ui-dropdown-items > li:last-child')));

        // choose the first option of the dropdown with the height of the box
        this.protHelpers.clickOnElement(this.heightInputField);
        this.protHelpers.clickOnElement(element(by.css('#height .ui-dropdown-items > li:last-child')));
    }

    clickOnDashboardsSidebarItem() {
        this.protHelpers.clickOnElement(this.dashboardsSidebarItem);
    }

    clickOnUpdateDashboardButton() {
        this.protHelpers.clickOnElement(this.updateDashboardButton);
    }

    clickOnSubmitButton() {
        this.protHelpers.clickOnElement(this.submitButton);
    }

    isDisplayDashboardBoxForm() {
        return this.protHelpers.isElementPresence(this.dashboardBoxForm);
    }

    getLabelTextOfWidthDropdown() {
        return this.protHelpers.getElementText(this.widthInputField.element(by.className('ui-dropdown-label')));
    }

    getLabelTextOfHeightDropdown() {
        return this.protHelpers.getElementText(this.heightInputField.element(by.className('ui-dropdown-label')));
    }

    getNotificationTitleTitle() {
        return this.protHelpers.getElementText(this.notificationTitle);
    }
}
