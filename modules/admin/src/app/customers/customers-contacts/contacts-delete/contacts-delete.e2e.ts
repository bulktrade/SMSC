import {ContactsDeletePage} from "./contacts-delete.page";

describe('Delete the contact', () => {
    let page = new ContactsDeletePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to update customer form', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy()
    });

    it('should click on the delete contact button', () => {
        page.clickOnCustomerContactsTab();
        page.clickOnDeleteContactButton();
        expect(page.isDisplayedDeleteSelector()).toBeTruthy();
    });

    it('should have `<p-messages>`', () => {
        expect(page.isDisplayedMessage()).toBeTruthy();
    });

    it('should have the cancel button and the confirm button', () => {
        expect(page.isDisplayedCancelButton()).toBeTruthy();
        expect(page.isDisplayedOkButton()).toBeTruthy();
    });

    it('should delete the customer', () => {
        page.clickOnOkButton();
        expect(page.getMessageTitle()).toEqual('SUCCESS');
    });
});
