import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class DashboardDeletePage {
    protHelpers = new ProtractorHelpers();

    dashboardsTab = element(by.className('dashboards-tab'));
    updateDashboardButton = element(by.css('.ui-datagrid-content .ui-g .item:first-child #delete-dashboard-button'));
    dashboardDeleteComponent = element(by.tagName('dashboard-delete'));
    notificationTitle = element(by.css('simple-notification .sn-title'));
    pMessages = element(by.tagName('p-messages'));
    cancelButton = element(by.id('cancel-button'));
    okButton = element(by.id('ok-button'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    clickOnDashboardsTab() {
        this.protHelpers.clickOnElement(this.dashboardsTab);
    }

    clickOnUpdateDashboardButton() {
        this.protHelpers.clickOnElement(this.updateDashboardButton);
    }

    clickOnOkButton() {
        this.protHelpers.clickOnElement(this.okButton);
    }

    getNotificationTitleTitle() {
        return this.protHelpers.getElementText(this.notificationTitle);
    }

    isDisplayedDashboardDeleteComponent() {
        return this.protHelpers.isElementPresence(this.dashboardDeleteComponent);
    }

    isDisplayedWarningMessage() {
        return this.protHelpers.isElementPresence(this.pMessages);
    }

    isDisplayedCancelButton() {
        return this.protHelpers.isElementPresence(this.cancelButton);
    }

    isDisplayedOkButton() {
        return this.protHelpers.isElementPresence(this.okButton);
    }
}
