import {DashboardBoxTypeCreatePage} from "./dashboard-box-type-create.page";

describe('Create the new dashboard box type', () => {
    let page = new DashboardBoxTypeCreatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the dashboard box type form', () => {
        page.clickOnSplitButton();
        page.clickOnCreateDashboardButton();
        expect(page.isDisplayDashboardBoxTypeForm()).toBeTruthy();
    });

    it('should fill the fields', () => {
        page.fillInputFields();
        page.nameInputField.getAttribute('value')
            .then(value => expect(value).toEqual('New dashboard box type'));
        page.getLabelTextOfTypeDropdown().then(label => expect(label).toEqual('Chart'));
        page.getLabelTextOfKindDropdown().then(label => expect(label).toEqual('Users Status'));
    });

    it('should create the new dashboard box type', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle()
            .then(title => expect(title).toEqual('SUCCESS'));
    });
});
