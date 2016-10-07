import { CreatePage } from '../../crudCreate/crudCreate.page';
import { LoginPage } from '../../../login/login.page';
import { EC } from '../../../common/expectedConditions';

export class GridPaginationPage {
    public login: LoginPage = new LoginPage();
    public crudPage: CreatePage = new CreatePage();

    public firstBtn = element(by.id('firstPage'));
    public previousBtn = element(by.id('previousPage'));
    public nextBtn = element(by.id('nextPage'));
    public lastBtn = element(by.id('lastPage'));
    public currentPage = element(by.id('currentPage'));

    constructor() {
    }

    getCurrentPage() {
        browser.wait(EC.presenceOf(this.currentPage), 5000);
        return this.currentPage.getText();
    }

    clickOnFirstBtn() {
        browser.wait(EC.elementToBeClickable(this.firstBtn), 5000);
        this.firstBtn.click();
    }

    clickOnPreviousBtn() {
        browser.wait(EC.elementToBeClickable(this.previousBtn), 5000);
        this.previousBtn.click();
    }

    clickOnNextBtn() {
        browser.wait(EC.elementToBeClickable(this.nextBtn), 5000);
        this.nextBtn.click();
    }

    clickOnLastBtn() {
        browser.wait(EC.elementToBeClickable(this.lastBtn), 5000);
        this.lastBtn.click();
    }
}
