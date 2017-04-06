import {MCCUpdatePage} from "./mcc-update.page";

describe('Update the new mcc', () => {
    let page = new MCCUpdatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to the mcc form', () => {
        page.sendKeysToGlobalFilter(); // filtering rows by mcc
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayMCCForm()).toBeTruthy();
    });

    it('update button should be enabled', () => {
        expect(page.isEnabledSubmitButton()).toBeTruthy();
    });

    it('should fill the fields', () => {
        page.fillInputFields();
        page.mccInputField.getAttribute('value')
            .then(value => expect(value).toEqual('100000000'));
        page.codeInputField.getAttribute('value')
            .then(value => expect(value).toEqual('243'));
        page.countryInputField.getAttribute('value')
            .then(value => expect(value).toEqual('Changed country'));
    });

    it('should update the mcc', () => {
        page.clickOnSubmitButton();
        page.getNotificationTitleTitle()
            .then(title => expect(title).toEqual('SUCCESS'));
    });
});
