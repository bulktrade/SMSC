import { CrudPage } from '../pages/crud/crud.page';
import { WaitUntil } from '../pages/common/waitUntilReady';
import { GridPaginationPage } from '../pages/gridPagination.page';

describe('CRUD', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let crudPage: CrudPage = new CrudPage();
    let paginationPage: GridPaginationPage = new GridPaginationPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        crudPage.ptor = ptor;
        crudPage.crudCreate.ptor = ptor;
        crudPage.crudDelete.ptor = ptor;
        paginationPage.crudPage.ptor = ptor;
        paginationPage.ptor = ptor;
    });

    it('log in smsc.io', () => {
        crudPage.get();
        crudPage.login.login();
        expect(crudPage.isPresentLogo()).toBeTruthy();
    });

    it('should navigate to the customer', () => {
        crudPage.clickOnCustomers();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should navigate to the create', () => {
        crudPage.clickOnBtnAddRecord();
        expect(crudPage.isPresentCrudCreateTag()).toBeTruthy();
    });

    it('should be create the new record', () => {
        crudPage.crudCreate.isVisibleHint()
            .then(css => {
                expect(css).toEqual('inline');
            });
        crudPage.crudCreate.fillInputFields(crudPage.crudCreate.inputElementsOnFirstLevel);
        crudPage.crudCreate.isVisibleHint()
            .then(css => {
                expect(css).toEqual('none');
            });
        crudPage.crudCreate.fillLinkset();
        crudPage.crudCreate.clickOnFormBtn();
        crudPage.crudCreate.clickOnBackBtn();
    });

    it('delete button should be enabled', () => {
        crudPage.crudCreate.clickOnSelectAll();
        crudPage.clickOnDeleteIcon();
        expect(crudPage.crudDelete.isPresentCrudDelete()).toBeTruthy();
    });

    it('should be delete records', () => {
        crudPage.crudDelete.clickOnOkBtn();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should be delete records on second level', () => {
        crudPage.clickOnBtnAddRecord();
        crudPage.crudCreate.clickOnContactsLinksetBtn();
        crudPage.crudCreate.clickOnSelectAll();
        crudPage.clickOnDeleteButton();
        crudPage.crudDelete.clickOnOkBtn();
    });

    it('should navigate to the grid meta data', () => {
        let width = 1980,
            height = 1020;
        ptor.manage().window().setSize(width, height);

        crudPage.clickOnMetaData();
        crudPage.clickOnGridMetaData();
        expect(crudPage.isPresentGridMetaData()).toBeTruthy();
    });

    it('should be the next page', () => {
        paginationPage.clickOnNextBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 2;
                expect(Number(currenPage)).toEqual(result);
            });
    });

    it('should be the previous page', () => {
        paginationPage.clickOnPreviousBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 1;
                expect(Number(currenPage)).toEqual(result);
            });
    });

    it('should be the last page', () => {
        paginationPage.clickOnLastBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 2;
                expect(Number(currenPage)).toEqual(result);
            });
    });

    it('should be the first page', () => {
        paginationPage.clickOnFirstBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 1;
                expect(Number(currenPage)).toEqual(result);
            });
    });

    // @todo not right place. crud.e2e has include only crud tests.
    it('should logout', () => {
        WaitUntil.logout(ptor);
        expect(true).toBeTruthy();
    });

});
