import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class DashboardSettingsPage {
    protHelpers = new ProtractorHelpers();

    dashboardBoxTypesTab = element(by.className('dashboard-box-types-tab'));
    dashboardsTab = element(by.className('dashboards-tab'));
    dashboardToolbar = element(by.className('dashboard-toolbar'));
    noDashboardsPanel = element(by.className('no-dashboards'));
    dashboardBoxTypesGrid = element(by.className('dashboard-box-types-grid'));
    splitButton = element(by.className('ui-splitbutton-menubutton'));
    createDashboardButton = element(by.css('.ui-menu-list > li:first-child'));
    createDashboardBoxTypeButton = element(by.css('.ui-menu-list > li:last-child'));
    dashboardBoxTypeCreateForm = element(by.tagName('dashboard-box-type-create'));
    dashboardCreateForm = element(by.tagName('dashboard-create'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    clickOnDashboardBoxTypesTab() {
        this.protHelpers.clickOnElement(this.dashboardBoxTypesTab);
    }

    clickOnDashboardsTab() {
        this.protHelpers.clickOnElement(this.dashboardsTab);
    }

    clickOnSplitButton() {
        this.protHelpers.clickOnElement(this.splitButton);
    }

    clickOnCreateDashboardButton() {
        this.protHelpers.clickOnElement(this.createDashboardButton);
    }

    clickOnCreateDashboardBoxTypeButton() {
        this.protHelpers.clickOnElement(this.createDashboardBoxTypeButton);
    }

    isDisplayedDashboardCreateForm() {
        return this.protHelpers.isElementPresence(this.dashboardCreateForm);
    }

    isDisplayedDashboardBoxTypeCreateForm() {
        return this.protHelpers.isElementPresence(this.dashboardBoxTypeCreateForm);
    }

    isDisplayedCreateDashboardButton() {
        return this.protHelpers.isElementPresence(this.createDashboardButton);
    }

    isDisplayedCreateDashboardBoxTypeButton() {
        return this.protHelpers.isElementPresence(this.createDashboardBoxTypeButton);
    }

    isDisplayedDashboardBoxTypesTab() {
        return this.protHelpers.isElementPresence(this.dashboardBoxTypesTab);
    }

    isDisplayedDashboardsTab() {
        return this.protHelpers.isElementPresence(this.dashboardsTab);
    }

    isDisplayedDashboardsToolbar() {
        return this.protHelpers.isElementPresence(this.dashboardToolbar);
    }

    isDisplayedNoDashboardsPanel() {
        return this.protHelpers.isElementPresence(this.noDashboardsPanel);
    }

    isDisplayedDashboardBoxTypesGrid() {
        return this.protHelpers.isElementPresence(this.dashboardBoxTypesGrid);
    }
}
