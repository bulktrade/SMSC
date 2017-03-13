import {ContactsUpdatePage} from "./contacts-update.page";

describe('Update the contact', () => {
    let page = new ContactsUpdatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to update customer form', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy()
    });

    it('should click on the update contact button', () => {
        page.clickOnCustomerContactsTab();
        page.clickOnUpdateContactButton();
        expect(page.isDisplayedUpdateSelector()).toBeTruthy();
    });

    it('should have input fields', () => {
        expect(page.isDisplayedInputFields()).toBeTruthy();
    });

    it('should fill input fields', () => {
        page.fillInputFields();
        expect(page.isEnabledSubmitButton()).toBeTruthy();
    });

    it('should set the value to salutation input field', () => {
        page.setSalutation();
        expect(page.getSalutationLabelText()).toEqual('Missus');
    });

    it('should set the value to type input field', () => {
        page.setType();
        expect(page.getTypeLabelText()).toEqual('PRIMARY');
    });

    it('should create the contact', () => {
        page.clickOnSubmitButton();
        expect(page.getMessageTitle()).toEqual('SUCCESS');
    });
});
