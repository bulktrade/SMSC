import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../../shared/protractor-helpers";

export class DashboardBoxTypeDeletePage {
    protHelpers = new ProtractorHelpers();

    dashboardBoxTypesTab = element(by.className('dashboard-box-types-tab'));
    deleteDashboardBoxTypeButton =
        element(by.css('.ui-datagrid-content .ui-g .item:last-child #remove-dashboard-box-type-button'));
    dashboardDeleteComponent = element(by.tagName('dashboard-box-type-delete'));
    notificationTitle = element(by.css('simple-notification .sn-title'));
    pMessages = element(by.tagName('p-messages'));
    cancelButton = element(by.id('cancel-button'));
    okButton = element(by.id('ok-button'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    clickOnDashboardBoxTypesTab() {
        this.protHelpers.clickOnElement(this.dashboardBoxTypesTab);
    }

    clickOnDeleteDashboardBoxTypeButton() {
        this.protHelpers.clickOnElement(this.deleteDashboardBoxTypeButton);
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
