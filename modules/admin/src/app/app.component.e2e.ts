import {AppTest} from "./app.page";

describe('App', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.apptest = new AppTest();
        ptor = protractor.wrapDriver(browser.driver);
    });

    it('should have a title', () => {
        let width = 1024,
            height = 768;
        ptor.manage().window().setSize(width, height);

        this.apptest.get();
        let subject = browser.getTitle();
        let result = 'SMSC Admin';

        expect(subject).toEqual(result);
    });

    it('should have input username', () => {
        let result = true;
        expect(this.apptest.isPresentUsername()).toEqual(result);
    });

    it('should have input password', () => {
        let result = true;
        expect(this.apptest.isPresentPassword()).toEqual(result);
    });

});
