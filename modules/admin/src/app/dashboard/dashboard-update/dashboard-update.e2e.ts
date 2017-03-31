import {DashboardUpdatePage} from "./dashboard-update.page";

describe('Update a dashboard', () => {
    let page = new DashboardUpdatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the dashboard form', () => {
        page.clickOnDashboardsTab();
        page.clickOnUpdateDashboardButton();
        expect(page.isDisplayDashboardForm()).toBeTruthy();
    });

    it('should fill the fields', () => {
        page.fillInputFields();
        page.nameInputField.getAttribute('value')
            .then(value => expect(value).toEqual('Traffic'));
        page.iconInputField.getAttribute('value')
            .then(value => expect(value).toEqual('fa-balance-scale'));
    });

    it('should update the dashboard', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle()
            .then(title => expect(title).toEqual('SUCCESS'));
    });
});
