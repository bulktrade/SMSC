import { CreatePage } from './crudCreate.page';

describe('CRUD Create', () => {
    let createPage: CreatePage;
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        createPage = new CreatePage();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('log in smsc.io', () => {
        let width = 1024,
            height = 768;
        ptor.manage().window().setSize(width, height);

        createPage.crudPage.get();
        createPage.crudPage.login.login();
        expect(createPage.crudPage.isPresentLogo()).toBeTruthy();
    });

    it('should navigate to the customer', () => {
        createPage.crudPage.clickOnCustomers();
        expect(createPage.crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should navigate to the create', () => {
        createPage.crudPage.clickOnBtnAddRecord();
        expect(createPage.crudPage.isPresentCrudCreateTag()).toBeTruthy();
    });

    it('should be create the new record', () => {
        createPage.fillInputFields(
            createPage.inputElementsOnFirstLevel);
    });

    it('should add two contacts and user', () => {
        createPage.chooseContacts();
        createPage.crudPage.getSizeRecords()
            .then(size => {
                createPage.clickOnAddLinkBtn();
                createPage.chooseUsers();

                expect(size).toEqual(2);
            });
    });

    it('form button should be enabled', () => {
        createPage.isEnabledFormButton()
            .then(isEnabled => {
                expect(isEnabled).toBeTruthy();
            });
    });

    it('should be displayed new record', () => {
        createPage.clickOnFormBtn();
        createPage.clickOnBackBtn();
        createPage.crudPage.isPresentRecord()
            .then((isPresent) => {
                expect(isPresent).toBeTruthy();
            });
    });

    it('should logout', () => {
        createPage.crudPage.login.logout();
        expect(createPage.crudPage.login.isPresentLogin()).toBeTruthy();
    });

});
