import { AppTest } from './pages/app.page';
import { WaitUntilReady } from './pages/common/waitUntilReady';

describe('App', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.apptest = new AppTest();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('should have a title', () => {
        this.apptest.get();
        let subject = browser.getTitle();
        let result = 'SMSC Admin';
        expect(subject).toEqual(result);
    });

    it('should have input username', () => {
        WaitUntilReady.waitUntilReady(this.apptest.elemUsername, ptor);
        let result = true;
        expect(this.apptest.isPresentUsername()).toEqual(result);
    });

    it('should have input password', () => {
        WaitUntilReady.waitUntilReady(this.apptest.elemPassword, ptor);
        let result = true;
        expect(this.apptest.isPresentPassword()).toEqual(result);
    });

});
