import {CustomersViewPage} from "./customers-view.page";
import {protractor, by, browser} from "protractor";

describe('Create view', () => {
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
            page.pageLinks.get(1).getAttribute('class')
                .then(className => {
                    expect(className.includes('ui-state-active')).toBeTruthy();
                });
            expect(page.getCountRows()).toEqual(2);
        });

        it('should get the previous page', () => {
            page.clickOnPreviousPage();
            // get the class attribute of the first page link and check for the presence of `ui-state-active` class
            page.pageLinks.get(0).getAttribute('class')
                .then(className => {
                    expect(className.includes('ui-state-active')).toBeTruthy();
                });
            expect(page.getCountRows()).toEqual(10);
        });

        it('should get the last page', () => {
            page.clickOnLastPage();
            // get the class attribute of the second page link and check for the presence of `ui-state-active` class
            page.pageLinks.get(1).getAttribute('class')
                .then(className => {
                    expect(className.includes('ui-state-active')).toBeTruthy();
                });
            expect(page.getCountRows()).toEqual(2);
        });

        it('should get the first page', () => {
            page.clickOnFirstPage();
            // get the class attribute of the first page link and check for the presence of `ui-state-active` class
            page.pageLinks.get(0).getAttribute('class')
                .then(className => {
                    expect(className.includes('ui-state-active')).toBeTruthy();
                });
            expect(page.getCountRows()).toEqual(10);
        });

        it('should choose 20 rows per page', () => {
            page.clickOnRowsPerPageDropdown();
            page.clickOnOptionWith20Rows();
            expect(page.getCountRows()).toEqual(12);
        });
    });

    describe('global filtering', () => {
        beforeAll(() => {
            page.get();
        });

        it('should filter the data by global filter', () => {
            page.sendKeysToSearchField('Default');
            expect(page.isDisplayedClearGlobalSearchField()).toBeTruthy();
            expect(page.getCountRows()).toEqual(1);
        });

        it('should clear the global search field', () => {
            page.clickOnClearGlobalSearchField();
            expect(page.getValueOfSearchField()).toEqual('');
        });
    });

    describe('inline editing', () => {
        beforeAll(() => {
            page.get();
        });

        it('should editing the first row', () => {
            page.cellsOfFirstRow.count()
                .then((length) => {
                    for (let i = 0; i < length; i++) {
                        let inputField = page.cellsOfFirstRow.get(i).element(by.tagName('input')); // get input field
                        page.protHelpers.clickOnElement(page.cellsOfFirstRow.get(i)); // click on cell
                        page.protHelpers.sendKeys(inputField, 'Aaaaaaaaaaaaaaaaaaa'); // enter new value to the cell
                        inputField.sendKeys(protractor.Key.ENTER); // update the row
                        browser.sleep(1000); // delay 1000ms
                        expect(inputField.getAttribute('value')).toEqual('Aaaaaaaaaaaaaaaaaaa'); // to compare the old value with the updated
                    }
                });
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
            expect(page.getMessageTitle()).toEqual('SUCCESS');
        });
    });
});
