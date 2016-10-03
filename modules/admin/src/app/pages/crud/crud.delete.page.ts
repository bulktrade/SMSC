import { WaitUntil } from '../common/waitUntilReady';

export class DeletePage {
    public crudDelete = element(by.tagName('crud-delete'));
    public okBtn = by.id('ok');

    private _ptor;

    constructor() {
    }

    isPresentCrudDelete() {
        WaitUntil.waitUntil(this.crudDelete, this._ptor);
        return this.crudDelete.isPresent();
    }

    clickOnOkBtn(): Promise<any> {
        return this._ptor.wait(protractor.until.elementLocated(this.okBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    // getters and setters

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
