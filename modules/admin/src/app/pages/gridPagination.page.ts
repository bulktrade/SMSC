import { CreatePage } from "./crud/crud.create.page";
import { WaitUntilReady } from "./common/waitUntilReady";
import { LoginPage } from "./login.page";

export class GridPaginationPage {
    public login: LoginPage = new LoginPage();
    public numberUsers: number = 55;
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
        WaitUntilReady.waitUntilReady(this.currentPage, this._ptor);
        return this.currentPage.getText();
    }

    clickOnFirstBtn() {
        WaitUntilReady.waitUntilReady(this.firstBtn, this._ptor);
        return this.firstBtn.click();
    }

    clickOnPreviousBtn() {
        WaitUntilReady.waitUntilReady(this.previousBtn, this._ptor);
        return this.previousBtn.click();
    }

    clickOnNextBtn() {
        WaitUntilReady.waitUntilReady(this.nextBtn, this._ptor);
        return this.nextBtn.click();
    }

    clickOnLastBtn() {
        WaitUntilReady.waitUntilReady(this.lastBtn, this._ptor);
        return this.lastBtn.click();
    }

    selectSizePage(option) {
        WaitUntilReady.waitUntilReady(this.sizePage, this._ptor);
        this.sizePage.click();

        WaitUntilReady.waitUntilReady(option, this._ptor);
        option.click();
    }

    getCountRows() {
        return this.rows.count();
    }

    createUsers() {
        for (let i = 2; i < this.numberUsers; i++) {
            WaitUntilReady.waitUntilReady(this.crudPage.inputElementsOnFirstLevel[0].element, this._ptor);
            this.crudPage.inputElementsOnFirstLevel[0].element.clear();
            this.crudPage.inputElementsOnFirstLevel[0].element.sendKeys(i);

            this.crudPage.clickOnFormBtn();
        }
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
