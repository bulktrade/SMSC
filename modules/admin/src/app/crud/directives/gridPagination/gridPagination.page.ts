import { CreatePage } from '../../crudCreate/crud.create.page';
import { LoginPage } from '../../../login/login.page';

export class GridPaginationPage {
    public login: LoginPage = new LoginPage();
    public crudPage: CreatePage = new CreatePage();

    public firstBtn = by.id('firstPage');
    public previousBtn = by.id('previousPage');
    public nextBtn = by.id('nextPage');
    public lastBtn = by.id('lastPage');
    public currentPage = by.id('currentPage');

    private _ptor;

    constructor() {
    }

    getCurrentPage(): Promise<string> {
        return this._ptor.wait(protractor.until.elementLocated(this.currentPage), 5000)
            .then(function (el: webdriver.IWebElement) {
                return Promise.resolve(el.getText());
            });
    }

    clickOnFirstBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.firstBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnPreviousBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.previousBtn), 5000)
            .then(function (el: webdriver.IWebElement) {
                return Promise.resolve(el.click());
            });
    }

    clickOnNextBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.nextBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnLastBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.lastBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
