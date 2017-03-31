import {DashboardBoxDeletePage} from "./dashboard-box-delete.page";

describe('Delete the dashboard box', () => {
    let page = new DashboardBoxDeletePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the delete window', () => {
        page.clickOnDashboardsSidebarItem();
        page.clickOnDeleteDashboardButton();
        expect(page.isDisplayedDashboardDeleteComponent()).toBeTruthy();
    });

    it('should have `<p-messages>`', () => {
        expect(page.isDisplayedWarningMessage()).toBeTruthy();
    });

    it('should have the cancel button and the confirm button', () => {
        expect(page.isDisplayedCancelButton()).toBeTruthy();
        expect(page.isDisplayedOkButton()).toBeTruthy();
    });

    it('should delete the dashboard box', () => {
        page.clickOnOkButton();
        page.getNotificationTitleTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
