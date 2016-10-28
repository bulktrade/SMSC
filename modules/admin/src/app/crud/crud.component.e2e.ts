import { CrudPage } from './crud.page';
import {
    CRUD_CREATE_SPEC_DEFINITIONS
} from './crud-create/crud-create.component.definitions';
import {
    CRUD_UPDATE_SPEC_DEFINITIONS
} from './crud-update/crud-update.component.definitions';
import {
    CRUD_META_DATA_SPEC_DEFINITIONS
} from '../crud-meta-data/crud-meta-data.component.definitions';
import {
    BINDING_PARAMETER_SPEC_DEFINITIONS
} from '../crud-meta-data/binding-parameter/binding-parameter.component.definitions';

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

    describe('CRUD Create', CRUD_CREATE_SPEC_DEFINITIONS);

    describe('CRUD Update', CRUD_UPDATE_SPEC_DEFINITIONS);

    describe('CRUD MetaData', CRUD_META_DATA_SPEC_DEFINITIONS);

    describe('CRUD MetaData binding parameter', BINDING_PARAMETER_SPEC_DEFINITIONS);
});
