import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";

export class DashboardBoxTypeUpdatePage {
    public protHelpers = new ProtractorHelpers();

    dashboardBoxTypesTab = element(by.className('dashboard-box-types-tab'));
    updateDashboardBoxTypeButton =
        element(by.css('.ui-datagrid-content .ui-g .item:last-child #update-dashboard-box-type-button'));
    dashboardBoxTypeForm = element(by.tagName('dashboard-box-type-update'));
    nameInputField = element(by.id('name'));
    typeInputField = element(by.id('type'));
    kindInputField = element(by.id('kind'));
    submitButton = element(by.id('submit-button'));
    notificationTitle = element(by.css('simple-notification .sn-title'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    fillInputFields() {
        this.protHelpers.isElementPresence(this.nameInputField);
        this.protHelpers.isElementPresence(this.typeInputField);
        this.protHelpers.isElementPresence(this.kindInputField);

        // send keys to the name input field
        this.nameInputField.clear();
        this.nameInputField.sendKeys('Changed dashboard box type');

        // choose the first option of the dropdown with the type of the box
        this.protHelpers.clickOnElement(this.typeInputField);
        this.protHelpers.clickOnElement(element(by.css('#type .ui-dropdown-items > li:last-child')));

        // choose the first option of the dropdown with the kind of the box
        this.protHelpers.clickOnElement(this.kindInputField);
        this.protHelpers.clickOnElement(element(by.css('#kind .ui-dropdown-items > li:last-child')));
    }

    clickOnDashboardBoxTypesTab() {
        this.protHelpers.clickOnElement(this.dashboardBoxTypesTab);
    }

    clickOnUpdateUpdateDashboardBoxTypeButton() {
        this.protHelpers.clickOnElement(this.updateDashboardBoxTypeButton);
    }

    clickOnSubmitButton() {
        this.protHelpers.clickOnElement(this.submitButton);
    }

    isDisplayDashboardBoxTypeForm() {
        return this.protHelpers.isElementPresence(this.dashboardBoxTypeForm);
    }

    getLabelTextOfTypeDropdown() {
        return this.protHelpers.getElementText(this.typeInputField.element(by.className('ui-dropdown-label')));
    }

    getLabelTextOfKindDropdown() {
        return this.protHelpers.getElementText(this.kindInputField.element(by.className('ui-dropdown-label')));
    }

    getNotificationTitleTitle() {
        return this.protHelpers.getElementText(this.notificationTitle);
    }
}
