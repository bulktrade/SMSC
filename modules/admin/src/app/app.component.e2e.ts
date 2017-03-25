import {AppTest} from "./app.page";
import {browser} from "protractor";

describe('App', () => {
    beforeEach(() => {
        this.apptest = new AppTest();
    });

    it('should have a title', () => {
        let width = 1024,
            height = 768;
        browser.driver.manage().window().setSize(width, height);

        this.apptest.get();
        let result: string = 'SMSC Admin';

        browser.getTitle().then(title => expect(title).toEqual(result));
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
