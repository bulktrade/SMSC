import {DashboardBoxCreatePage} from "./dashboard-box-create.page";

describe('Create the new dashboard box', () => {
    let page = new DashboardBoxCreatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the dashboard box form', () => {
        page.clickOndashboardsSidebarItem();
        page.clickOnCreateDashboardButton();
        expect(page.isDisplayDashboardBoxForm()).toBeTruthy();
    });

    it('should fill input fields', () => {
        page.fillInputFields();
        page.nameInputField.getAttribute('value').then(value => expect(value).toEqual('New dashboard'));
        page.descriptionInputField.getAttribute('value').then(value => expect(value).toEqual('new dashboard'));
        page.orderInputField.getAttribute('value').then(value => expect(value).toEqual('100'));
        page.nameInputField.getAttribute('value').then(value => expect(value).toEqual('New dashboard'));
        page.getLabelTextOfTypeDropdown().then(label => expect(label).toEqual('6 BUBBLE_CHART'));
        page.getLabelTextOfWidthDropdown().then(label => expect(label).toEqual('100%'));
        page.getLabelTextOfHeightDropdown().then(label => expect(label).toEqual('100%'));
    });

    it('should create the new dashboard box', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
