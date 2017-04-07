import {MCCDeletePage} from "./mcc-delete.page";

describe('Delete the mcc', () => {
    let page = new MCCDeletePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to delete mcc', () => {
        page.clickOnColumnMCC();
        page.clickOnColumnMCC(); // sorting rows by mcc
        page.clickOnRowDeleteButton(); // and choose the first one
        expect(page.isDisplayedMCCDeleteSelector()).toBeTruthy()
    });

    it('should have `<p-messages>`', () => {
        expect(page.isDisplayedMessage()).toBeTruthy();
    });

    it('should have the cancel button and the confirm button', () => {
        expect(page.isDisplayedCancelButton()).toBeTruthy();
        expect(page.isDisplayedOkButton()).toBeTruthy();
    });

    it('should delete the mcc', () => {
        page.clickOnSubmitButton();
        page.getMessageTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
