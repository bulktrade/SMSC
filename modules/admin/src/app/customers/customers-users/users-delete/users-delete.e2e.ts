import {UsersDeletePage} from "./users-delete.page";

describe('Delete the user', () => {
    let page = new UsersDeletePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to update customer form', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy()
    });

    it('should click on the delete user button', () => {
        page.clickOnCustomerUsersTab(); // click on the tab with customer
        page.clickOnDeleteUserButton(); // click on the delete button of the latest box
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
        page.getMessageTitle().then(title => expect(title).toEqual('SUCCESS'));
    });
});
