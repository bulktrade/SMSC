import {DashboardSettingsPage} from "./dashboard-settings.page";

describe('Dashboard settings', () => {
    let page = new DashboardSettingsPage();

    beforeAll(() => {
        page.get();
    });

    it('should have the =toolbar, tab with dashboards and tab with dashboard box types', () => {
        expect(page.isDisplayedDashboardBoxTypesTab()).toBeTruthy();
        expect(page.isDisplayedDashboardsTab()).toBeTruthy();
        expect(page.isDisplayedDashboardsToolbar()).toBeTruthy();
    });

    it('should switch to the tab with dashboard box types', () => {
        page.clickOnDashboardBoxTypesTab();
        expect(page.isDisplayedDashboardBoxTypesGrid()).toBeTruthy();
    });

    it('should have buttons for creating dashboard and dashboard box type', () => {
        page.clickOnSplitButton();
        expect(page.isDisplayedCreateDashboardButton()).toBeTruthy();
        expect(page.isDisplayedCreateDashboardBoxTypeButton()).toBeTruthy();
    });

    it('should navigate to the dashboard form', () => {
        page.get();
        page.clickOnSplitButton();
        page.clickOnCreateDashboardButton();
        expect(page.isDisplayedDashboardCreateForm()).toBeTruthy();
    });

    it('should navigate to the dashboard box type form', () => {
        page.get();
        page.clickOnSplitButton();
        page.clickOnCreateDashboardBoxTypeButton();
        expect(page.isDisplayedDashboardBoxTypeCreateForm()).toBeTruthy();
    });
});
