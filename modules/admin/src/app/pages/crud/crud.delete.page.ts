import { WaitUntilReady } from "../common/waitUntilReady";
export class DeletePage {
    private _ptor;

    public crudDelete = element(by.tagName('crud-delete'));
    public okBtn = element(by.id('ok'));

    isPresentCrudDelete() {
        WaitUntilReady.waitUntilReady(this.crudDelete, this._ptor);
        return this.crudDelete.isPresent();
    }

    clickOnOkBtn() {
        WaitUntilReady.waitUntilReady(this.okBtn, this._ptor);
        return this.okBtn.click();
    }

    /** getters and setters **/

    get ptor() {
        return this._ptor;
    }
    set ptor(value) {
        this._ptor = value;
    }
}