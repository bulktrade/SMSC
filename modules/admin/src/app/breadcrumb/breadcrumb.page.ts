import { LoginPage } from '../login/login.page';
import { EC } from '../shared/expected-conditions';
import { element, by, browser } from "protractor";

export class BreadcrumbPage {
    public login: LoginPage = new LoginPage();
    public logo = element(by.id('logo'));
    public breadcrumbTag = element(by.tagName('breadcrumb'));
    public mainTag = element(by.tagName('breadcrumb'));

    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    isPresentLogo() {
        browser.wait(EC.presenceOf(this.logo), 5000);
        return this.logo.isPresent();
    }

    isPresentBreadcrumb() {
        browser.wait(EC.presenceOf(this.breadcrumbTag), 5000);
        return this.breadcrumbTag.isPresent();
    }

    isPresentMainContent() {
        browser.wait(EC.presenceOf(this.mainTag), 5000);
        return this.mainTag.isPresent();
    }

}
