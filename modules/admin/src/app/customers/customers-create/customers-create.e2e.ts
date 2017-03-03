import {CustomersCreatePage} from "./customers-create.page";

describe('Create customers', () => {
    let page = new CustomersCreatePage();

    // create 11 customers
    for (let i = 0; i < 11; i++) {
        it('should navigate to create component', () => {
            page.get();
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
            page.fillInputFields(i);
            expect(page.isEnabledSubmitButton()).toBeTruthy();
        });

        it('should create the customer', () => {
            page.clickOnSubmitButton();
            expect(page.isDisplayedSuccessfulMessage()).toBeTruthy();
        });

        it('should navigate to update customer form after create', () => {
            expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy();
        });
    }
});
