import {CustomersDeletePage} from "./customers-delete.page";

describe('Delete customer', () => {
    let page = new CustomersDeletePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to delete customer', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowDeleteButton(); // and choose the first one
        expect(page.isDisplayedCustomersDeleteSelector()).toBeTruthy()
    });

    it('should have `<p-messages>`', () => {
        expect(page.isDisplayedMessage()).toBeTruthy();
    });

    it('should have the cancel button and the confirm button', () => {
        expect(page.isDisplayedCancelButton()).toBeTruthy();
        expect(page.isDisplayedOkButton()).toBeTruthy();
    });

    it('should delete the customer', () => {
        page.clickOnSubmitButton();
        expect(page.getMessageTitle()).toEqual('SUCCESS');
    });
});
