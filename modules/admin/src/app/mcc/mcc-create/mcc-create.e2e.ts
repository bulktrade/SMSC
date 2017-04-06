import {MCCCreatePage} from "./mcc-create.page";

describe('Create the new mcc', () => {
    let page = new MCCCreatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the mcc form', () => {
        page.clickOnCreateButton();
        expect(page.isDisplayMCCForm()).toBeTruthy();
    });

    it('create button should be disabled', () => {
        expect(page.isEnabledSubmitButton()).toBeFalsy();
    });

    it('should fill the fields', () => {
        page.fillInputFields();
        page.mccInputField.getAttribute('value')
            .then(value => expect(value).toEqual('1000000000'));
        page.codeInputField.getAttribute('value')
            .then(value => expect(value).toEqual('263'));
        page.countryInputField.getAttribute('value')
            .then(value => expect(value).toEqual('Country'));
    });

    it('should create the new mcc', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle()
            .then(title => expect(title).toEqual('SUCCESS'));
    });
});
