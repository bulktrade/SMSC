import { CreatePage } from './crud/crud.create.page';
import { WaitUntil } from './common/waitUntilReady';
import { LoginPage } from './login.page';

export class GridPaginationPage {
    public login: LoginPage = new LoginPage();
    public crudPage: CreatePage = new CreatePage();

    public firstBtn = element(by.id('firstPage'));
    public previousBtn = element(by.id('previousPage'));
    public nextBtn = element(by.id('nextPage'));
    public lastBtn = element(by.id('lastPage'));
    public currentPage = element(by.id('currentPage'));
    public sizePage = element(by.css('.page-size md-select'));
    public showAllRecords = element(by.css('.page-size option:last-of-type'));
    public rows = element.all(by.css(
        '.ag-body-container > div'));

    private _ptor;

    constructor() {
    }

    getCurrentPage() {
        WaitUntil.waitUntil(this.currentPage, this._ptor);
        return this.currentPage.getText();
    }

    clickOnFirstBtn() {
        WaitUntil.waitUntil(this.firstBtn, this._ptor);
        return this.firstBtn.click();
    }

    clickOnPreviousBtn() {
        WaitUntil.waitUntil(this.previousBtn, this._ptor);
        return this.previousBtn.click();
    }

    clickOnNextBtn() {
        WaitUntil.waitUntil(this.nextBtn, this._ptor);
        return this.nextBtn.click();
    }

    clickOnLastBtn() {
        WaitUntil.waitUntil(this.lastBtn, this._ptor);
        return this.lastBtn.click();
    }

    selectSizePage(option) {
        WaitUntil.waitUntil(this.sizePage, this._ptor);
        this.sizePage.click();

        WaitUntil.waitUntil(option, this._ptor);
        option.click();
    }

    getCountRows() {
        return this.rows.count();
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
