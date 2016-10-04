import { CrudPage } from './crud.page';
import { WaitUntil } from '../common/waitUntilReady';
import { GridPaginationPage } from './directives/gridPagination/gridPagination.page';

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
        crudPage.crudCreate.fillInputFields(crudPage.crudCreate.inputElementsOnFirstLevel);
    });

    it('should add contacts', () => {
        crudPage.crudCreate.chooseContacts()
            .then(() => {
                expect(crudPage.crudCreate.isPresentContactsHint()).toBeFalsy();
            });
    });

    it('should add users', () => {
        crudPage.crudCreate.chooseUsers()
            .then(() => {
                expect(crudPage.crudCreate.isPresentUsersHint()).toBeFalsy();
            });
    });

    it('form button should be enabled', () => {
        crudPage.crudCreate.isEnabledFormButton()
            .then(isEnabled => {
                expect(isEnabled).toBeTruthy();
            });
    });

    it('should be displayed new record', () => {
        crudPage.crudCreate.clickOnFormBtn()
            .then(() => {
                crudPage.crudCreate.clickOnBackBtn()
                    .then(() => {
                        expect(crudPage.isPresentRecord()).toBeTruthy();
                    });
            });
    });

    it('should navigate to the delete', () => {
        crudPage.crudCreate.clickOnSelectAll()
            .then(() => {
                crudPage.clickOnDeleteButton()
                    .then(() => {
                        expect(crudPage.crudDelete.isPresentCrudDelete()).toBeTruthy();
                    });
            });
    });

    it('should be delete records', () => {
        crudPage.crudDelete.clickOnOkBtn()
            .then(() => {
                expect(crudPage.isDisplayedSearchPanel()).toBeTruthy();
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
