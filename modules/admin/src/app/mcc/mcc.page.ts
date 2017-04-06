import {browser, by, element} from "protractor";
import {ProtractorHelpers} from "../shared/protractor-helpers";

export class MCCViewPage {
    public protHelpers = new ProtractorHelpers();

    pDataTable = element(by.tagName('p-dataTable'));
    pHeader = element(by.tagName('p-header'));
    pPaginator = element(by.tagName('p-paginator'));
    searchField = element(by.className('global-filter'));
    containerOfRows = element.all(by.css('.mcc-view tbody tr'));
    cellsOfFirstRow = element.all(by.css('.mcc-view tbody tr:first-child > td:nth-child(2)~td'));
    clearGlobalSearchField = element(by.css('.search-panel .clear-search-button'));
    selectAllRowsCheckbox = element(by.css('th p-dtcheckbox'));
    deleteButton = element(by.css('.ctrl-panel .delete-button'));
    confirmDeleteMessage = element(by.css('#confirm-deletion-window p-messages'));
    cancelDeleteButton = element(by.css('#confirm-deletion-window #cancel-button'));
    okDeleteButton = element(by.css('#confirm-deletion-window #ok-button'));
    messageTitle = element(by.css('simple-notification .sn-title'));

    // pagination elements
    firstPage = element(by.className('ui-paginator-first'));
    previousPage = element(by.className('ui-paginator-prev'));
    nextPage = element(by.className('ui-paginator-next'));
    lastPage = element(by.className('ui-paginator-last'));
    rowsPerPageDropdown = element(by.className('ui-paginator-rpp-options'));
    optionWith20Rows = element.all(by.css('.ui-paginator-rpp-options option')).get(1);
    pageLinks = element.all(by.css('.ui-paginator-pages a'));

    get() {
        browser.get(browser.baseUrl + '/mcc');
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

    clickOnFirstPage() {
        this.protHelpers.clickOnElement(this.firstPage);
    }

    clickOnPreviousPage() {
        this.protHelpers.clickOnElement(this.previousPage);
    }

    clickOnNextPage() {
        this.protHelpers.clickOnElement(this.nextPage);
    }

    clickOnLastPage() {
        this.protHelpers.clickOnElement(this.lastPage);
    }

    clickOnRowsPerPageDropdown() {
        this.protHelpers.clickOnElement(this.rowsPerPageDropdown);
    }

    clickOnOptionWith20Rows() {
        this.protHelpers.clickOnElement(this.optionWith20Rows);
    }
}
