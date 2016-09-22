import { WaitUntilReady } from "../common/waitUntilReady";
export class CreatePage {
    private _ptor;

    public selectElements = {
        contacts: element(by.css('.contacts #add')),
        parentCustomer: element(by.css('.parentCustomer #add')),
        users: element(by.css('.users #add'))
    };
    public inputElements = {
        customersId: element(by.css('.customerId input')),
        companyName: element(by.css('.companyName input')),
        country: element(by.css('.country input')),
        city: element(by.css('.city input')),
        postcode: element(by.css('.postcode input')),
        street: element(by.css('.street input')),
        street2: element(by.css('.street2 input')),
        vatid: element(by.css('.vatid input'))
    };
    public hint = element(by.css('.companyName md-hint'));
    public addLinksetBtn = element(by.id('add'));
    public selectAll = element(by.id('select-all'));
    public addLinkBtn = element(by.id('addLink'));

    isVisibleHint() {
        return this.hint.getCssValue('display')
            .then(res => {
                return Promise.resolve(res);
            })
    }

    fillLinkset() {
        for (let i in this.selectElements) {
            WaitUntilReady.waitUntilReady(this.selectElements[i], this._ptor);
            this.selectElements[i].click();

            this.clickOnSelectAll();
            this.clickOnAddLinkBtn();
        }
    }

    clickOnAddLinkBtn() {
        WaitUntilReady.waitUntilReady(this.addLinkBtn, this._ptor);
        this.addLinkBtn.click();
    }

    clickOnSelectAll() {
        WaitUntilReady.waitUntilReady(this.selectAll, this._ptor);
        this.selectAll.click();
    }

    /** getters and setters **/

    get ptor() {
        return this._ptor;
    }
    set ptor(value) {
        this._ptor = value;
    }
}