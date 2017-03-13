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
