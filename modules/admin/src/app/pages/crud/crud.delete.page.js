"use strict";
var waitUntilReady_1 = require('../common/waitUntilReady');
var DeletePage = (function () {
    function DeletePage() {
        this.crudDelete = element(by.tagName('crud-delete'));
        this.okBtn = element(by.id('ok'));
    }
    DeletePage.prototype.isPresentCrudDelete = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.crudDelete, this._ptor);
        return this.crudDelete.isPresent();
    };
    DeletePage.prototype.clickOnOkBtn = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.okBtn, this._ptor);
        return this.okBtn.click();
    };
    Object.defineProperty(DeletePage.prototype, "ptor", {
        // getters and setters
        get: function () {
            return this._ptor;
        },
        set: function (value) {
            this._ptor = value;
        },
        enumerable: true,
        configurable: true
    });
    return DeletePage;
}());
exports.DeletePage = DeletePage;
//# sourceMappingURL=crud.delete.page.js.map