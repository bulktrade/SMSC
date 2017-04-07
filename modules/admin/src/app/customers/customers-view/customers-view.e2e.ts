import {browser, by, protractor} from "protractor";

import {CustomersViewPage} from "./customers-view.page";

describe('Customers view', () => {
    let page = new CustomersViewPage();

    beforeAll(() => {
        page.get();
    });

    it('should have `<p-dataTable>`, `<p-header>` and `<p-paginator>`', () => {
        expect(page.isDisplayedDataTable()).toBeTruthy();
        expect(page.isDisplayedPaginator()).toBeTruthy();
        expect(page.isDisplayedHeader()).toBeTruthy();
    });

    describe('pagination', () => {
        beforeAll(() => {
            page.get();
        });

        it('should get the next page', () => {
            page.clickOnNextPage();
            // get the class attribute of the second page link and check for the presence of `ui-state-active` class
            page.pageLinks.get(1).getText().then(text => expect(text).toEqual('2'));
            page.pageLinks.get(1).getAttribute('class')
                .then(className => expect(className.includes('ui-state-active')).toBeTruthy());
        });

        it('should get the previous page', () => {
            page.clickOnPreviousPage();
            // get the class attribute of the first page link and check for the presence of `ui-state-active` class
            page.pageLinks.get(0).getText().then(text => expect(text).toEqual('1'));
            page.pageLinks.get(0).getAttribute('class')
                .then(className => expect(className.includes('ui-state-active')).toBeTruthy());
        });

        it('should get the last page', () => {
            page.clickOnLastPage();
            // get the class attribute of the second page link and check for the presence of `ui-state-active` class
            page.pageLinks.get(1).getText().then(text => expect(text).toEqual('2'));
            page.pageLinks.get(1).getAttribute('class')
                .then(className => expect(className.includes('ui-state-active')).toBeTruthy());
        });

        it('should get the first page', () => {
            page.clickOnFirstPage();
            // get the class attribute of the first page link and check for the presence of `ui-state-active` class
            page.pageLinks.get(0).getText().then(text => expect(text).toEqual('1'));
            page.pageLinks.get(0).getAttribute('class')
                .then(className => expect(className.includes('ui-state-active')).toBeTruthy());
        });

        it('should choose 20 rows per page', () => {
            page.clickOnRowsPerPageDropdown();
            page.clickOnOptionWith20Rows();
            page.getCountRows().then(count => expect(count).toEqual(12));
        });

        describe('global filtering', () => {
            beforeAll(() => {
                page.get();
            });

            it('should filter the data by global filter', () => {
                page.sendKeysToSearchField('Default');
                expect(page.isDisplayedClearGlobalSearchField()).toBeTruthy();
                page.getCountRows().then(count => expect(count).toEqual(1));
            });

            it('should clear the global search field', () => {
                page.clickOnClearGlobalSearchField();
                page.getValueOfSearchField().then(value => expect(value).toEqual(''));
            });
        });

        describe('inline editing', () => {
            beforeAll(() => {
                page.get();
            });

            it('should editing the first row', () => {
                page.sendKeysToSearchField('Aaaaaaaaaaaaaaaa');
                let inputField = page.cellsOfFirstRow.get(1).element(by.tagName('input')); // get input field
                page.protHelpers.clickOnElement(page.cellsOfFirstRow.get(1)); // click on cell
                browser.sleep(5000);
                page.protHelpers.sendKeys(inputField, 'Aaaaaaaaaaaaaaaaaaa'); // enter new value to the cell
                inputField.sendKeys(protractor.Key.ENTER); // update the row
                browser.sleep(2000); // delay 1000ms
                inputField.getAttribute('value').then(value => expect(value).toEqual('Aaaaaaaaaaaaaaaaaaa')); // to compare the old value with the updated
            });
        });

        describe('multiple deleting', () => {
            beforeAll(() => {
                page.get();
            });

            it('should select 10 rows and navigate to delete window', () => {
                page.clickOnColumnCompanyName(); // sorting rows by company name
                page.clickOnSelectAllRowsCheckbox();
                page.clickOnDeleteButton();
                expect(page.isDisplayedConfirmDeleteMessage()).toBeTruthy();
            });

            it('should have the cancel button and the confirm button', () => {
                expect(page.isDisplayedDeleteCancelButton()).toBeTruthy();
                expect(page.isDisplayedDeleteOkButton()).toBeTruthy();
            });

            it('should delete the customers', () => {
                page.clickOnConfirmDeleteRowsButton();
                page.getMessageTitle().then(title => expect(title).toEqual('SUCCESS'));
            });
        });
    });
});
