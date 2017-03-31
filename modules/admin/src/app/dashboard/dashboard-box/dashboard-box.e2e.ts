import {DashboardBoxPage} from "./dashboard-box.page";

describe('Dashboard box', () => {
    let page = new DashboardBoxPage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the dashboard component', () => {
        page.clickOnDashboardsSidebarItem();
        expect(page.isDisplayedDashboardComponent()).toBeTruthy();
    });

    it('dashboard box should have the toolbar with buttons', () => {
        expect(page.isDisplayedConfigDashboardBoxButton()).toBeTruthy();
        expect(page.isDisplayedRemoveDashboardBoxButton()).toBeTruthy();
        expect(page.isDisplayedUpdateDashboardBoxButton()).toBeTruthy();
        expect(page.isDisplayedFullscreenDashboardBoxButton()).toBeTruthy();
    });

    it('should enable the fullscreen mode for the dashboard box', () => {
        page.clickOnFullscreenDashboardBoxButton();
        expect(page.isLastDashboardBoxHasFullscreenClass()).toBeTruthy();
    });

    it('should disable the fullscreen mode for the dashboard box', () => {
        page.clickOnFullscreenDashboardBoxButton();
        expect(page.isLastDashboardBoxHasFullscreenClass()).toBeFalsy();
    });

    it('should change the width of the dashboard box', () => {
        page.clickOnConfigDashboardBoxButton();
        page.changeWithOfDashboardBox();
        page.hasClass(page.lastDashboard, 'ui-md-3').then(isHasClass => expect(isHasClass).toBeTruthy());
    });

    it('should change the height of the dashboard box', () => {
        page.changeHeightOfDashboardBox();
        page.lastDashboard.getCssValue('height').then(height => expect(height).toEqual('146px'));
    });
});
