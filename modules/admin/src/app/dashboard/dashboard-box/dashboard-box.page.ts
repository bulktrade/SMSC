import {browser, by, element, ElementFinder} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class DashboardBoxPage {
    public protHelpers = new ProtractorHelpers();

    dashboardComponent = element(by.tagName('dashboard'));
    dashboardsSidebarItem = element(by.className('dashboards'));
    lastDashboard = element(by.css('.dashboard-boxes > dashboard-box:last-child'));
    updateDashboardBoxButton = this.lastDashboard.element(by.className('btn-update-box'));
    removeDashboardBoxButton = this.lastDashboard.element(by.className('btn-remove-box'));
    configDashboardBoxButton = this.lastDashboard.element(by.className('btn-conf-box'));
    fullscreenDashboardBoxButton = this.lastDashboard.element(by.className('btn-fullscreen-box'));
    widthInputField = this.lastDashboard.element(by.id('cog-width'));
    heightInputField = this.lastDashboard.element(by.id('cog-height'));

    get() {
        browser.get(browser.baseUrl + '/dashboard/settings');
    }

    clickOnDashboardsSidebarItem() {
        this.protHelpers.clickOnElement(this.dashboardsSidebarItem);
    }

    isDisplayedUpdateDashboardBoxButton() {
        return this.protHelpers.isElementPresence(this.updateDashboardBoxButton);
    }

    isDisplayedRemoveDashboardBoxButton() {
        return this.protHelpers.isElementPresence(this.removeDashboardBoxButton);
    }

    isDisplayedConfigDashboardBoxButton() {
        return this.protHelpers.isElementPresence(this.configDashboardBoxButton);
    }

    clickOnConfigDashboardBoxButton() {
        this.protHelpers.clickOnElement(this.configDashboardBoxButton);
    }

    isDisplayedFullscreenDashboardBoxButton() {
        return this.protHelpers.isElementPresence(this.fullscreenDashboardBoxButton);
    }

    isDisplayedDashboardComponent() {
        return this.protHelpers.isElementPresence(this.dashboardComponent);
    }

    clickOnFullscreenDashboardBoxButton() {
        this.protHelpers.clickOnElement(this.fullscreenDashboardBoxButton);
    }

    isLastDashboardBoxHasFullscreenClass() {
        return this.hasClass(this.lastDashboard, 'fullscreen');
    }

    changeWithOfDashboardBox() {
        this.protHelpers.clickOnElement(this.widthInputField);
        this.protHelpers.clickOnElement(this.widthInputField.element(by.css('.ui-dropdown-items > li:first-child')));
    }

    changeHeightOfDashboardBox() {
        this.protHelpers.clickOnElement(this.heightInputField);
        this.protHelpers.clickOnElement(this.heightInputField.element(by.css('.ui-dropdown-items > li:first-child')));
    }

    hasClass(element: ElementFinder, cls: string) {
        return element.getAttribute('class').then((classes) => {
            return classes.includes(cls);
        });
    }
}
