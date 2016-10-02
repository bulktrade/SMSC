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
        crudPage.clickOnCustomers()
            .then(() => {
                expect(crudPage.isPresentCustomers()).toBeTruthy();
            });
    });

    it('should navigate to the create', () => {
        crudPage.clickOnBtnAddRecord()
            .then(() => {
                expect(crudPage.isPresentCrudCreateTag()).toBeTruthy();
            });
    });

    it('should be create the new record', () => {
        crudPage.crudCreate.fillInputFields(crudPage.crudCreate.inputElementsOnFirstLevel)
            .then(() => {
                crudPage.crudCreate.fillLinkset();
            });
    });

    it('delete button should be enabled', () => {
        crudPage.crudCreate.clickOnSelectAll()
            .then(() => {
                crudPage.clickOnDeleteIcon()
                    .then(() => {
                        expect(crudPage.crudDelete.isPresentCrudDelete()).toBeTruthy();
                    });
            });
    });

    it('should be delete records', () => {
        crudPage.crudDelete.clickOnOkBtn()
            .then(() => {
                expect(crudPage.isPresentCustomers()).toBeTruthy();
            });
    });

    it('should be delete records on second level', () => {
        crudPage.deleteRecordsOnSecondLevel();
    });

    it('should navigate to the grid meta data', () => {
        let width = 1024,
            height = 768;

        ptor.manage().window().setSize(width, height)
            .then(() => {
                crudPage.clickOnMetaData()
                    .then(() => {
                        crudPage.clickOnGridMetaData()
                            .then(() => {
                                expect(crudPage.isPresentGridMetaData()).toBeTruthy();
                            });
                    });
            });
    });

    it('should be the next page', () => {
        paginationPage.clickOnNextBtn()
            .then(() => {
                paginationPage.getCurrentPage()
                    .then(currenPage => {
                        let result: number = 2;
                        expect(Number(currenPage)).toEqual(result);
                    });
            });
    });

    it('should be the previous page', () => {
        paginationPage.clickOnPreviousBtn()
            .then(() => {
                paginationPage.getCurrentPage()
                    .then(currenPage => {
                        let result: number = 1;
                        expect(Number(currenPage)).toEqual(result);
                    });
            });
    });

    it('should be the last page', () => {
        paginationPage.clickOnLastBtn()
            .then(() => {
                paginationPage.getCurrentPage()
                    .then(currenPage => {
                        let result: number = 2;
                        expect(Number(currenPage)).toEqual(result);
                    });
            });
    });

    it('should be the first page', () => {
        paginationPage.clickOnFirstBtn()
            .then(() => {
                paginationPage.getCurrentPage()
                    .then(currenPage => {
                        let result: number = 1;
                        expect(Number(currenPage)).toEqual(result);
                    });
            });
    });

    // @todo not right place. crud.e2e has include only crud tests.
    it('should logout', () => {
        WaitUntil.logout(ptor);
        expect(true).toBeTruthy();
    });

});
