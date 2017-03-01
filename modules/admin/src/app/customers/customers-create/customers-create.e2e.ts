import {CustomersCreatePage} from "./customers-create.page";

describe('Create customers', () => {
    let page = new CustomersCreatePage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to create component', () => {
        page.clickOnCustomersViewCreateButton();
        expect(page.isDisplayedCustomersForm()).toBeTruthy();
    });

    it('should have input fields', () => {
        expect(page.isDisplayedInputFields()).toBeTruthy();
    });

    it('create button should be disabled', () => {
        expect(page.isEnabledSubmitButton()).toBeFalsy();
    });

    it('should fill input fields', () => {
        page.fillInputFields();
        expect(page.isEnabledSubmitButton()).toBeTruthy();
    });

    it('should display create new customer', () => {
        page.clickOnSubmitButton();
        expect(page.isDisplayedSuccessfulMessage()).toBeTruthy();
    });

    it('should navigate to update customer form after create', () => {
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy();
    });
});
