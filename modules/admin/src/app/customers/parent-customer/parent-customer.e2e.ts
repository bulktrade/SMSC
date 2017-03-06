import {ParentCustomerPage} from "./parent-customer.page";

describe('Parent customer', () => {
    let page = new ParentCustomerPage();

    beforeAll(() => {
        page.get();
    });

    it('should navigate to update customer form', () => {
        page.clickOnColumnCompanyName(); // sorting rows by company name
        page.clickOnRowUpdateButton(); // and choose the first one
        expect(page.isDisplayedCustomersUpdateSelector()).toBeTruthy()
    });

    it('should add the parent customer', () => {
        page.clickOnDropdownButton();
        page.clickOnDropdownFirstItem();
        expect(page.getMessageTitle()).toEqual('SUCCESS');
    });

    it('should remove the parent customer', () => {
        page.isDisplayedButtonRemove();
        page.clickOnButtonRemove();
        expect(page.getMessageTitle()).toEqual('SUCCESS');
    });
});
