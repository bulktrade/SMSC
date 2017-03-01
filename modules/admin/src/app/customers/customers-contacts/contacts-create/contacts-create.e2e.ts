import {ContactsCreatePage} from "./contacts-create.page";

describe('Create the contact', () => {
    let page = new ContactsCreatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to update customer form', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy()
    });

    it('should click on the create new contact button', () => {
        page.clickOnCustomerContactsTab();
        page.clickOnCreateContactButton();
        expect(page.isDisplayedContactsCreateSelector()).toBeTruthy();
    });

    // @todo create some specs to fill input fields and create the new contacts for the customer
});
