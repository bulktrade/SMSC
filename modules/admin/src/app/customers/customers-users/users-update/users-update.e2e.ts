import {UsersUpdatePage} from "./users-update.page";

describe('Update the user', () => {
    let page = new UsersUpdatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to update customer form', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy()
    });

    it('should click on the update user button', () => {
        page.clickOnCustomerUsersTab(); // click on the tab with users
        page.clickOnUpdateUserButton(); // click on the update button of the latest box
        expect(page.isDisplayedUsersUpdateSelector()).toBeTruthy();
    });

    it('should have input fields', () => {
        expect(page.isDisplayedInputFields()).toBeTruthy();
    });

    it('should fill input fields', () => {
        page.fillInputFields();
        page.clickOnActiveCheckbox();
        page.clickOnBlockedCheckbox();
        expect(page.isEnabledSubmitButton()).toBeTruthy();
    });

    it('should set the value to salutation input field', () => {
        page.setSalutation();
        expect(page.getSalutationLabelText()).toEqual('Missus');
    });

    it('should update the user', () => {
        page.clickOnSubmitButton();
        expect(page.getMessageTitle()).toEqual('SUCCESS');
    });
});
