import {DashboardCreatePage} from "./dashboard-create.page";

describe('Create the new dashboard', () => {
    let page = new DashboardCreatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the dashboard form', () => {
        page.clickOnSplitButton();
        page.clickOnCreateDashboardButton();
        expect(page.isDisplayDashboardForm()).toBeTruthy();
    });

    it('should fill the fields', () => {
        page.fillInputFields();
        page.nameInputField.getAttribute('value')
            .then(value => expect(value).toEqual('Statistics'));
        page.iconInputField.getAttribute('value')
            .then(value => expect(value).toEqual('fa-rocket'));
    });

    it('should create the new dashboard', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle()
            .then(title => expect(title).toEqual('SUCCESS'));
    });
});
