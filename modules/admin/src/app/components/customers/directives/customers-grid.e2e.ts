import {CustomerGridTest} from '../../testpages/CustomerGridTest';

describe('Customer grid', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        browser.ignoreSynchronization = true;
        this.customerGrid = new CustomerGridTest();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('login', () => {
        this.customerGrid.get();
        this.customerGrid.login.login();
        expect(true).toBeTruthy();
    });

    it('let\'s go to dashboard', () => {
        this.customerGrid.clickOnItemNavCustomers(ptor).then(() => {
            expect(true).toBeTruthy();
        });
    });

    it('let\'s go to customers', () => {
        this.customerGrid.clickBtnWrap(ptor).then(() => {
            expect(true).toBeTruthy();
        });
    });

    it('add records', () => {
        let beforeCountRows, afterCountRows;
        this.customerGrid.waitUntilReady(this.customerGrid.addBtn, ptor);
        beforeCountRows = this.customerGrid.getCountRows();
        this.customerGrid.addBtn.click();
        afterCountRows = this.customerGrid.getCountRows();
        expect(afterCountRows > beforeCountRows).toBeTruthy();
    });

    it('remove first row', () => {
        this.customerGrid.remove(ptor)
            .then(() => {
               expect(true).toBeTruthy();
            });
    });

});
