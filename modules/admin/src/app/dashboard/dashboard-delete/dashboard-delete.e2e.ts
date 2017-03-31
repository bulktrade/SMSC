import {DashboardDeletePage} from "./dashboard-delete.page";

describe('Delete the dashboard', () => {
    let page = new DashboardDeletePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the delete window', () => {
        page.clickOnDashboardsTab();
        page.clickOnUpdateDashboardButton();
        expect(page.isDisplayedDashboardDeleteComponent()).toBeTruthy();
    });

    it('should have `<p-messages>`', () => {
        expect(page.isDisplayedWarningMessage()).toBeTruthy();
    });

    it('should have the cancel button and the confirm button', () => {
        expect(page.isDisplayedCancelButton()).toBeTruthy();
        expect(page.isDisplayedOkButton()).toBeTruthy();
    });

    it('should delete the dashboard', () => {
        page.clickOnOkButton();
        page.getNotificationTitleTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
