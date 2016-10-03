import { AppTest } from './pages/app.page';
import { WaitUntil } from './pages/common/waitUntilReady';

describe('App', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.apptest = new AppTest();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('should have a title', () => {
        let width = 1980,
            height = 1020;
        ptor.manage().window().setSize(width, height);

        this.apptest.get();
        let subject = browser.getTitle();
        let result = 'SMSC Admin';
        expect(subject).toEqual(result);
    });

    it('should have input username', () => {
        WaitUntil.waitUntil(this.apptest.elemUsername, ptor);
        let result = true;
        expect(this.apptest.isPresentUsername()).toEqual(result);
    });

    it('should have input password', () => {
        WaitUntil.waitUntil(this.apptest.elemPassword, ptor);
        let result = true;
        expect(this.apptest.isPresentPassword()).toEqual(result);
    });

});
