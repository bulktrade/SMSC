import { BindingParameterPage } from './binding-parameter.page';

export const BINDING_PARAMETER_SPEC_DEFINITIONS = () => {
    let bindingParam: BindingParameterPage;
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        bindingParam = new BindingParameterPage();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('log in smsc.io', () => {
        let width = 1024,
            height = 768;
        ptor.manage().window().setSize(width, height);

        bindingParam.crudPage.get();
        bindingParam.crudPage.login.login();
        expect(bindingParam.crudPage.isPresentLogo()).toBeTruthy();
    });

    // navigate to metaDataBindingParameter component
    it('should be navigate to metaDataBindingParameter', () => {
        bindingParam.crudPage.clickOnMetaData();
        bindingParam.clickOnBindingParameterItem();
        expect(bindingParam.isDisplayedBindingParameterDirective()).toBeTruthy();
    });

    // navigate to create form
    it('should navigate to the create', () => {
        bindingParam.crudPage.clickOnBtnAddRecord();
        expect(bindingParam.crudPage.isPresentCrudCreateTag()).toBeTruthy();
    });

    // create new record in metaDataBindingParameter class
    it('should be create new record in metaDataBindingParameter', () => {
        bindingParam.fillForm();
        bindingParam.crudCreate.clickOnFormBtn();
        bindingParam.crudCreate.clickOnBackBtn();
        bindingParam.crudPage.isPresentRecord()
            .then((isPresent) => {
                expect(isPresent).toBeTruthy();
            });
    });

    // navigate to mataFormData component
    it('should navigate to mataFormData', () => {
        bindingParam.crudPage.clickOnFormMetaData();
        expect(bindingParam.crudPage.isPresentFormMetaData()).toBeTruthy();
    });

    // add bindingParams to contacts field
    it('should add bindingParams to contacts field', () => {
        bindingParam.crudPage.isPresentRecord()
            .then(() => {
                bindingParam.clickOnContactsEdit()
                    .then(() => {
                        bindingParam.chooseBindingParameter();
                        bindingParam.crudCreate.clickOnFormBtn();
                        expect(bindingParam.crudPage.isPresentNotification()).toBeTruthy();
                    });
            });
    });

    // navigate to customer component
    it('should navigate to the customer', () => {
        bindingParam.crudPage.clickOnCustomers();
        expect(bindingParam.crudPage.isPresentCustomers()).toBeTruthy();
    });

    // navigate to edit component
    it('should navigate to the create', () => {
        bindingParam.crudPage.clickOnEditIcon();
        bindingParam.crudCreate.clickOnContacts();
        bindingParam.crudPage.getSizeRecords()
            .then(size => {
                expect(size).toEqual(2);
            });
    });

    it('should logout', () => {
        bindingParam.crudPage.login.logout();
        expect(bindingParam.crudPage.login.isPresentLogin()).toBeTruthy();
    });

};
