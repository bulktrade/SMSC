import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";

export class DashboardBoxCreatePage {
    public protHelpers = new ProtractorHelpers();

    dashboardsSidebarItem = element(by.className('dashboards'));
    createDashboardButton = element(by.className('create-box-button'));
    dashboardBoxForm = element(by.tagName('dashboard-box-create'));

    nameInputField = element(by.id('name'));
    descriptionInputField = element(by.id('description'));
    orderInputField = element(by.id('order'));
    widthInputField = element(by.id('width'));
    heightInputField = element(by.id('height'));
    typeInputField = element(by.id('dashboard-box-type'));

    submitButton = element(by.id('submit-button'));
    notificationTitle = element(by.css('simple-notification .sn-title'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    fillInputFields() {
        this.protHelpers.isElementPresence(this.nameInputField);
        this.protHelpers.isElementPresence(this.descriptionInputField);
        this.protHelpers.isElementPresence(this.orderInputField);
        this.protHelpers.isElementPresence(this.widthInputField);
        this.protHelpers.isElementPresence(this.heightInputField);
        this.protHelpers.isElementPresence(this.typeInputField);

        // send keys to the name input field
        this.nameInputField.clear();
        this.nameInputField.sendKeys('New dashboard');

        // send keys to the description input field
        this.descriptionInputField.clear();
        this.descriptionInputField.sendKeys('new dashboard');

        // send keys to the order input field
        this.orderInputField.clear();
        this.orderInputField.sendKeys('100');

        // choose the first option of the dropdown with the with of the box
        this.protHelpers.clickOnElement(this.widthInputField);
        this.protHelpers.clickOnElement(element(by.css('#width .ui-dropdown-items > li:last-child')));

        // choose the first option of the dropdown with the height of the box
        this.protHelpers.clickOnElement(this.heightInputField);
        this.protHelpers.clickOnElement(element(by.css('#height .ui-dropdown-items > li:last-child')));

        // choose the first option of the dropdown with the type of the box
        this.protHelpers.clickOnElement(this.typeInputField);
        this.protHelpers.clickOnElement(element(by.css('#dashboard-box-type .ui-dropdown-items > li:last-child')));
    }

    clickOndashboardsSidebarItem() {
        this.protHelpers.clickOnElement(this.dashboardsSidebarItem);
    }

    clickOnCreateDashboardButton() {
        this.protHelpers.clickOnElement(this.createDashboardButton);
    }

    clickOnSubmitButton() {
        this.protHelpers.clickOnElement(this.submitButton);
    }

    isDisplayDashboardBoxForm() {
        return this.protHelpers.isElementPresence(this.dashboardBoxForm);
    }

    getLabelTextOfTypeDropdown() {
        return this.protHelpers.getElementText(this.typeInputField.element(by.className('ui-dropdown-label')));
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
