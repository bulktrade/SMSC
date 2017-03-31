import {DashboardBoxTypeDeletePage} from "./dashboard-box-type-delete.page";

describe('Delete the dashboard box type', () => {
    let page = new DashboardBoxTypeDeletePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the delete window', () => {
        page.clickOnDashboardBoxTypesTab();
        page.clickOnDeleteDashboardBoxTypeButton();
        expect(page.isDisplayedDashboardDeleteComponent()).toBeTruthy();
    });

    it('should have `<p-messages>`', () => {
        expect(page.isDisplayedWarningMessage()).toBeTruthy();
    });

    it('should have the cancel button and the confirm button', () => {
        expect(page.isDisplayedCancelButton()).toBeTruthy();
        expect(page.isDisplayedOkButton()).toBeTruthy();
    });

    it('should delete the dashboard box type', () => {
        page.clickOnOkButton();
        page.getNotificationTitleTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
