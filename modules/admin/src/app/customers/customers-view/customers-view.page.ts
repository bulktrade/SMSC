import {browser, element, by, protractor} from "protractor";
import {ProtractorHelpers} from "../../shared/protractor-helpers";

export class CustomersViewPage {
    public protHelpers = new ProtractorHelpers();

    // DOM elements
    columnCompanyName = element(by.cssContainingText('.ui-column-title', 'Company Name'));
    pDataTable = element(by.tagName('p-dataTable'));
    pHeader = element(by.tagName('p-header'));
    pPaginator = element(by.tagName('p-paginator'));
    searchField = element(by.className('search-field'));
    containerOfRows = element.all(by.css('#customers-view-window tbody tr'));
    cellsOfFirstRow = element.all(by.css('#customers-view-window tbody tr:first-child > td:nth-child(4)~td'));
    clearGlobalSearchField = element(by.css('.search-panel .clear-search-button'));
    selectAllRowsCheckbox = element(by.css('th p-dtcheckbox'));
    deleteButton = element(by.css('.ctrl-panel .delete-button'));
    confirmDeleteMessage = element(by.css('#confirm-deletion-window p-messages'));
    cancelDeleteButton = element(by.css('#confirm-deletion-window #cancel-button'));
    okDeleteButton = element(by.css('#confirm-deletion-window #ok-button'));
    messageTitle = element(by.css('simple-notification .sn-title'));

    get() {
        browser.get(browser.baseUrl + '/customers');
    }

    inlineEditingFirstRow(iterator: number) {
        let inputField = this.cellsOfFirstRow.get(iterator).element(by.tagName('input'));
        this.protHelpers.clickOnElement(this.cellsOfFirstRow.get(iterator)); // click on cell
        this.protHelpers.sendKeys(inputField, 'Aaaaaaaaaaaaaaaaaaa'); // enter new value to the cell
        inputField.sendKeys(protractor.Key.ENTER); // update the row
    }

    isDisplayedDataTable() {
        return this.protHelpers.isElementPresence(this.pDataTable);
    }

    isDisplayedPaginator() {
        return this.protHelpers.isElementPresence(this.pPaginator);
    }

    isDisplayedHeader() {
        return this.protHelpers.isElementPresence(this.pHeader);
    }

    sendKeysToSearchField(value: string) {
        this.protHelpers.sendKeys(this.searchField, value);
    }

    getCountRows() {
        return this.containerOfRows.count();
    }

    getValueOfSearchField() {
        return this.searchField.getAttribute('value');
    }

    clickOnSelectAllRowsCheckbox() {
        this.protHelpers.clickOnElement(this.selectAllRowsCheckbox);
    }

    clickOnDeleteButton() {
        this.protHelpers.clickOnElement(this.deleteButton);
    }

    clickOnClearGlobalSearchField() {
        this.protHelpers.clickOnElement(this.clearGlobalSearchField);
    }

    isDisplayedClearGlobalSearchField() {
        return this.protHelpers.isElementPresence(this.clearGlobalSearchField);
    }

    isDisplayedConfirmDeleteMessage() {
        return this.protHelpers.isElementPresence(this.confirmDeleteMessage);
    }

    isDisplayedDeleteCancelButton() {
        return this.protHelpers.isElementPresence(this.cancelDeleteButton);
    }

    isDisplayedDeleteOkButton() {
        return this.protHelpers.isElementPresence(this.okDeleteButton);
    }

    clickOnConfirmDeleteRowsButton() {
        this.protHelpers.clickOnElement(this.okDeleteButton);
    }

    getMessageTitle() {
        return this.protHelpers.getElementText(this.messageTitle);
    }

    clickOnColumnCompanyName() {
        this.protHelpers.clickOnElement(this.columnCompanyName);
    }
}
