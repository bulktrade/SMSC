import { UpdatePage } from './crud-update.page';

describe('CRUD Update', () => {
    let updatePage: UpdatePage;
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        updatePage = new UpdatePage();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('log in smsc.io', () => {
        let width = 1024,
            height = 768;
        ptor.manage().window().setSize(width, height);

        updatePage.crudPage.get();
        updatePage.crudPage.login.login();
        expect(updatePage.crudPage.isPresentLogo()).toBeTruthy();
    });

    it('should navigate to the customer', () => {
        updatePage.crudPage.clickOnCustomers();
        expect(updatePage.crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should navigate to edit', () => {
        updatePage.clickOnEditIcon();
        expect(updatePage.isPresentUpdateDirective()).toBeTruthy();
    });

    it('should be modified value', () => {
        updatePage.sentKeysToEditableField();
        updatePage.clickOnFormBtn();
        updatePage.crudPage.clickOnBackBtn();
        expect(updatePage.crudPage.isPresentCrudViewTag).toBeTruthy();
    });

    it('should navigate to edit', () => {
        updatePage.clickOnEditIcon();
        expect(updatePage.isPresentUpdateDirective()).toBeTruthy();
    });

    it('should be displayed the modified value', () => {
        let expectedValue = 2;

        updatePage.editableField.getAttribute('value')
            .then((value) => {
                expect(Number(value)).toEqual(expectedValue);
            });
    });

    it('should logout', () => {
        updatePage.crudPage.login.logout();
        expect(updatePage.crudPage.login.isPresentLogin()).toBeTruthy();
    });

});
