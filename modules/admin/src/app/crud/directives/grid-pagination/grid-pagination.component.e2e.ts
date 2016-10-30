import { GridPaginationPage } from './grid-pagination.page';

describe('Grid pagination', () => {
    let paginationPage: GridPaginationPage;
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        paginationPage = new GridPaginationPage();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('log in smsc.io', () => {
        let width = 1024,
            height = 768;
        ptor.manage().window().setSize(width, height);

        paginationPage.crudPage.get();
        paginationPage.crudPage.login.login();
        expect(paginationPage.crudPage.isPresentLogo()).toBeTruthy();
    });

    it('should navigate to the grid meta data', () => {
        let width = 1024,
            height = 768;

        ptor.manage().window().setSize(width, height)
            .then(() => {
                paginationPage.crudPage.clickOnMetaData();
                paginationPage.crudPage.clickOnGridMetaData();
                expect(paginationPage.crudPage.isPresentGridMetaData()).toBeTruthy();
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

    it('should logout', () => {
        paginationPage.login.logout();
        expect(paginationPage.login.isPresentLogin()).toBeTruthy();
    });

});
