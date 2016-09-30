"use strict";
var login_page_1 = require('./login.page');
var waitUntilReady_1 = require('./common/waitUntilReady');
var crud_create_page_1 = require('./crud/crud.create.page');
var crud_delete_page_1 = require('./crud/crud.delete.page');
var CrudPage = (function () {
    function CrudPage() {
        this.login = new login_page_1.LoginPage();
        this.crudCreate = new crud_create_page_1.CreatePage();
        this.crudDelete = new crud_delete_page_1.DeletePage();
        this.logo = element(by.id('logo'));
        this.customersItem = element(by.className('customers'));
        this.customersTag = element(by.tagName('customers'));
        this.btnAddRecord = element(by.id('addRow'));
        this.crudCreateTag = element(by.tagName('crud-create'));
        this.btnDeleteRow = element(by.id('deleteRow'));
        this.backBtn = element(by.id('back'));
    }
    CrudPage.prototype.get = function () {
        browser.get('/admin');
    };
    CrudPage.prototype.isEnabledDeleteButton = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.btnDeleteRow, this.ptor);
        return this.btnDeleteRow.isEnabled();
    };
    CrudPage.prototype.clickOnDeleteButton = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.btnDeleteRow, this.ptor);
        return this.btnDeleteRow.click();
    };
    CrudPage.prototype.clickOnBackBtn = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.backBtn, this.ptor);
        this.backBtn.click();
    };
    CrudPage.prototype.clickOnCustomers = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.customersItem, this.ptor);
        this.customersItem.click();
    };
    CrudPage.prototype.clickOnBtnAddRecord = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.btnAddRecord, this.ptor);
        this.btnAddRecord.click();
    };
    CrudPage.prototype.isPresentLogo = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.logo, this.ptor);
        return this.logo.isPresent();
    };
    CrudPage.prototype.isPresentCrudCreateTag = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.crudCreateTag, this.ptor);
        return this.crudCreateTag.isPresent();
    };
    CrudPage.prototype.isPresentCustomers = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.customersTag, this.ptor);
        return this.customersTag.isPresent();
    };
    Object.defineProperty(CrudPage.prototype, "ptor", {
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
    return CrudPage;
}());
exports.CrudPage = CrudPage;
//# sourceMappingURL=crud.page.js.map