import {CustomersUpdatePage} from "./customers-update.page";

describe('Update customer', () => {
    let page = new CustomersUpdatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to update customer form', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy()
    });

    it('should have input fields', () => {
        expect(page.isDisplayedInputFields()).toBeTruthy();
    });

    it('should have `<parent-customer>`, `<contacts>` and `<users>`', () => {
        expect(page.isDisplayedParentCustomerComponent()).toBeTruthy();
        expect(page.isDisplayedCustomerContactsComponent()).toBeTruthy();
        expect(page.isDisplayedCustomerUserComponent()).toBeTruthy();
    });

    it('should update the customer', () => {
        page.sendKeysToPostcodeInputField();
        page.clickOnSubmitButton();
        expect(page.getMessageTitle().toString()).toEqual('SUCCESS');
    });
});
