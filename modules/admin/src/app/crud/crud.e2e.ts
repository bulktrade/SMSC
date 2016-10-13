import { CrudPage } from './crud.page';

describe('CRUD', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let crudPage: CrudPage = new CrudPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('log in smsc.io', () => {
        let width = 1024,
            height = 768;
        ptor.manage().window().setSize(width, height);

        crudPage.get();
        crudPage.login.login();
        expect(crudPage.isPresentLogo()).toBeTruthy();
    });

    it('should navigate to the customer', () => {
        crudPage.clickOnCustomers();
        expect(crudPage.isPresentCustomers()).toBeTruthy();
    });

    it('should display a grid', () => {
        expect(crudPage.isPresentCrudViewTag()).toBeTruthy();
    });

    it('should logout', () => {
        crudPage.login.logout();
        expect(crudPage.login.isPresentLogin()).toBeTruthy();
    });

});
