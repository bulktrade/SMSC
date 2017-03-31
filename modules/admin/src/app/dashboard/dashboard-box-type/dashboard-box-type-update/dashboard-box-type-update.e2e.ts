import {DashboardBoxTypeUpdatePage} from "./dashboard-box-type-update.page";

describe('Update the new dashboard box type', () => {
    let page = new DashboardBoxTypeUpdatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the dashboard box type form', () => {
        page.clickOnDashboardBoxTypesTab();
        page.clickOnUpdateUpdateDashboardBoxTypeButton();
        expect(page.isDisplayDashboardBoxTypeForm()).toBeTruthy();
    });

    it('should fill the fields', () => {
        page.fillInputFields();
        page.nameInputField.getAttribute('value')
            .then(value => expect(value).toEqual('Changed dashboard box type'));
        page.getLabelTextOfTypeDropdown().then(label => expect(label).toEqual('Chart'));
        page.getLabelTextOfKindDropdown().then(label => expect(label).toEqual('Users Status'));
    });

    it('should update the dashboard box type', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
