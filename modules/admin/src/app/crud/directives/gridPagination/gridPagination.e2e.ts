import { CrudPage } from "../../../pages/crud.page";
import { GridPaginationPage } from "../../../pages/gridPagination.page";
import { WaitUntilReady } from "../../../pages/common/waitUntilReady";
import { count } from "rxjs/operator/count";

describe('Grid pagination', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let crudPage: CrudPage = new CrudPage();
    let paginationPage: GridPaginationPage = new GridPaginationPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        crudPage.ptor = ptor;
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
        paginationPage.crudPage.isVisibleHint()
            .then(css => {
                expect(css).toEqual('inline');
            });
        paginationPage.crudPage.fillInputFields(paginationPage.crudPage.inputElementsOnFirstLevel);
        paginationPage.crudPage.isVisibleHint()
            .then(css => {
                expect(css).toEqual('none');
            });
        paginationPage.crudPage.fillLinkset();
        paginationPage.crudPage.clickOnFormBtn();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should create users', () => {
        paginationPage.createUsers();
        crudPage.clickOnBackBtn();
    });

    it('should be the second page', () => {
        paginationPage.clickOnNextBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 2;
                expect(Number(currenPage)).toEqual(result);
            })
    });

    it('should be the first page', () => {
        paginationPage.clickOnPreviousBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 1;
                expect(Number(currenPage)).toEqual(result);
            })
    });

    it('should be the last page', () => {
        paginationPage.clickOnLastBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 3;
                expect(Number(currenPage)).toEqual(result);
            })
    });

    it('should be the first page', () => {
        paginationPage.clickOnFirstBtn();
        paginationPage.getCurrentPage()
            .then(currenPage => {
                let result: number = 1;
                expect(Number(currenPage)).toEqual(result);
            })
    });

    it('should logout', () => {
        WaitUntilReady.logout(ptor);
        expect(true).toBeTruthy();
    });

});
