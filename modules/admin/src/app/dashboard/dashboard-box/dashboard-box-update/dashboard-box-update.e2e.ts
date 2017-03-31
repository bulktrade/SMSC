import {DashboardBoxUpdatePage} from "./dashboard-box-update.page";

describe('Update the dashboard box', () => {
    let page = new DashboardBoxUpdatePage();

    beforeAll(() => {
        page.get();
    });

    it('should show the modal dialog with the dashboard box form', () => {
        page.clickOnDashboardsSidebarItem();
        page.clickOnUpdateDashboardButton();
        expect(page.isDisplayDashboardBoxForm()).toBeTruthy();
    });

    it('should fill input fields', () => {
        page.fillInputFields();
        page.nameInputField.getAttribute('value').then(value => expect(value).toEqual('Changed dashboard'));
        page.descriptionInputField.getAttribute('value').then(value => expect(value).toEqual('changed dashboard'));
        page.getLabelTextOfWidthDropdown().then(label => expect(label).toEqual('100%'));
        page.getLabelTextOfHeightDropdown().then(label => expect(label).toEqual('100%'));
    });

    it('should update the dashboard box', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
