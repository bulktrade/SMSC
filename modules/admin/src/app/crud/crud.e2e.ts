import { CrudPage } from './crud.page';
import { WaitUntil } from '../common/waitUntilReady';
import { GridPaginationPage } from './directives/gridPagination/gridPagination.page';
import {
    BindingParameterPage
} from '../crudMetadata/metaDataBindingParameter/metaDataBindingParameter.page';

describe('CRUD', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let crudPage: CrudPage = new CrudPage();
    let paginationPage: GridPaginationPage = new GridPaginationPage();
    let bngParam: BindingParameterPage = new BindingParameterPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        crudPage.ptor = ptor;
        crudPage.crudCreate.ptor = ptor;
        paginationPage.crudPage.ptor = ptor;
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
        crudPage.crudCreate.fillInputFields(crudPage.crudCreate.inputElementsOnFirstLevel);
    });

    it('should add two contacts and user', () => {
        crudPage.crudCreate.chooseContacts();
        crudPage.getSizeRecords()
            .then(size => {
                crudPage.crudCreate.clickOnAddLinkBtn();
                crudPage.crudCreate.chooseUsers();

                expect(size).toEqual(2);
            });
    });

    it('form button should be enabled', () => {
        crudPage.crudCreate.isEnabledFormButton()
            .then(isEnabled => {
                expect(isEnabled).toBeTruthy();
            });
    });

    it('should be displayed new record', () => {
        crudPage.crudCreate.clickOnFormBtn();
        crudPage.crudCreate.clickOnBackBtn();
        crudPage.isPresentRecord()
            .then((isPresent) => {
                expect(isPresent).toBeTruthy();
            });
    });

    // it('should navigate to the delete', () => {
    //     crudPage.crudCreate.clickOnSelectAll()
    //         .then(() => {
    //             crudPage.clickOnDeleteButton()
    //                 .then(() => {
    //                     expect(crudPage.crudDelete.isPresentCrudDelete()).toBeTruthy();
    //                 });
    //         });
    // });
    //
    // it('should be delete records', () => {
    //     crudPage.crudDelete.clickOnOkBtn()
    //         .then(() => {
    //             expect(crudPage.isDisplayedSearchPanel()).toBeTruthy();
    //         });
    // });

    it('should navigate to the grid meta data', () => {
        let width = 1024,
            height = 768;

        ptor.manage().window().setSize(width, height)
            .then(() => {
                crudPage.clickOnMetaData();
                crudPage.clickOnGridMetaData();
                expect(crudPage.isPresentGridMetaData()).toBeTruthy();
            });
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

    // navigate to metaDataBindingParameter component
    it('should be navigate to metaDataBindingParameter', () => {
        bngParam.clickOnBindingParameterItem();
        expect(bngParam.isDisplayedBindingParameterDirective()).toBeTruthy();
    });

    // navigate to create form
    it('should navigate to the create', () => {
        crudPage.clickOnBtnAddRecord();
        expect(crudPage.isPresentCrudCreateTag()).toBeTruthy();
    });

    // create new record in metaDataBindingParameter class
    it('should be create new record in metaDataBindingParameter', () => {
        bngParam.fillForm();
        crudPage.crudCreate.clickOnFormBtn();
        crudPage.crudCreate.clickOnBackBtn();
        crudPage.isPresentRecord()
            .then((isPresent) => {
                expect(isPresent).toBeTruthy();
            });
    });

    // navigate to mataFormData component
    it('should navigate to mataFormData', () => {
        crudPage.clickOnFormMetaData();
        expect(crudPage.isPresentFormMetaData()).toBeTruthy();
    });

    // add bindingParams to contacts field
    it('should add bindingParams to contacts field', () => {
        crudPage.isPresentRecord()
            .then(() => {
                bngParam.clickOnContactsEdit()
                    .then(() => {
                        bngParam.chooseBindingParameter();
                        crudPage.crudCreate.clickOnFormBtn();
                        expect(crudPage.isPresentNotification()).toBeTruthy();
                    });
            });
    });

    // navigate to customer component
    it('should navigate to the customer', () => {
        crudPage.clickOnCustomers();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    // navigate to edit component
    it('should navigate to the create', () => {
        crudPage.clickOnEditIcon();
        crudPage.crudCreate.clickOnContacts();
        crudPage.getSizeRecords()
            .then(size => {
                expect(size).toEqual(1);
            });
    });

    // @todo not right place. crud.e2e has include only crud tests.
    it('should logout', () => {
        WaitUntil.logout(ptor);
        expect(true).toBeTruthy();
    });

});
