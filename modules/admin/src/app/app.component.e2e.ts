import {AppPage} from "./app.page";
import {browser} from "protractor";

describe('AppComponent', () => {
    let page: AppPage = new AppPage();

    beforeAll(() => {
        page.get();
    });

    it('should have a title', () => {
        browser.getTitle().then(title => expect(title).toEqual('SMSC Admin'));
    });

    it('should have the username input field', () => {
        expect(page.isPresentUsername()).toBeTruthy();
    });

    it('should have the password input field', () => {
        expect(page.isPresentPassword()).toBeTruthy();
    });
});
