import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";

export class DashboardBoxDeletePage {
    protHelpers = new ProtractorHelpers();

    dashboardsSidebarItem = element(by.className('dashboards'));
    lastDashboard = element(by.css('.dashboard-boxes > dashboard-box:last-child'));
    deleteDashboardButton = this.lastDashboard.element(by.className('btn-remove-box'));

    dashboardDeleteComponent = element(by.tagName('dashboard-box-delete'));
    notificationTitle = element(by.css('simple-notification .sn-title'));
    pMessages = element(by.tagName('p-messages'));
    cancelButton = element(by.id('cancel-button'));
    okButton = element(by.id('ok-button'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    clickOnDashboardsSidebarItem() {
        this.protHelpers.clickOnElement(this.dashboardsSidebarItem);
    }

    clickOnDeleteDashboardButton() {
        this.protHelpers.clickOnElement(this.deleteDashboardButton);
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
