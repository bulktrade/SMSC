import { WaitUntil } from '../common/waitUntilReady';

export class DeletePage {
    public crudDelete = element(by.tagName('crud-delete'));
    public okBtn = element(by.id('ok'));

    private _ptor;

    constructor() {
    }

    isPresentCrudDelete() {
        WaitUntil.waitUntil(this.crudDelete, this._ptor);
        return this.crudDelete.isPresent();
    }

    clickOnOkBtn() {
        WaitUntil.waitUntil(this.okBtn, this._ptor);
        return this.okBtn.click();
    }

    // getters and setters

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
