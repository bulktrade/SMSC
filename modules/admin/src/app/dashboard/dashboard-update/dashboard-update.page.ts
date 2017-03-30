import {browser, element, by} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class DashboardUpdatePage {
    public protHelpers = new ProtractorHelpers();

    dashboardsTab = element(by.className('dashboards-tab'));
    updateDashboardButton = element(by.css('.ui-datagrid-content .ui-g .item:first-child #update-dashboard-button'));
    dashboardForm = element(by.tagName('dashboard-update'));
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
        this.nameInputField.sendKeys('Traffic');
        this.iconInputField.clear();
        this.iconInputField.sendKeys('fa-balance-scale');
    }

    clickOnDashboardsTab() {
        this.protHelpers.clickOnElement(this.dashboardsTab);
    }

    clickOnUpdateDashboardButton() {
        this.protHelpers.clickOnElement(this.updateDashboardButton);
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
