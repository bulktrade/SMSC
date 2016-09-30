"use strict";
var waitUntilReady_1 = require('../common/waitUntilReady');
var CreatePage = (function () {
    function CreatePage() {
        this.hint = element(by.css('.companyName md-hint'));
        this.selectAll = element(by.css('.ag-body-container > div:first-of-type .ag-selection-checkbox'));
        this.addLinkBtn = element(by.id('addLink'));
        this.btnAddRecord = element(by.id('addRow'));
        this.formBtn = element(by.id('modify'));
        this.backBtn = element(by.id('back'));
        this.selectElements = {
            contacts: element(by.css('.contacts #add')),
            users: element(by.css('.users #add'))
        };
        this.embeddedListElements = {
            type: element(by.className('type')),
            salutation: element(by.className('salutation'))
        };
        // first CRUD level
        this.inputElementsOnFirstLevel = [
            {
                nameElement: 'customersId',
                element: element(by.css('.customerId input')), data: 1
            },
            {
                nameElement: 'companyName',
                element: element(by.css('.companyName input')), data: 'SMSC'
            },
            {
                nameElement: 'country',
                element: element(by.css('.country input')), data: 'Ukraine'
            },
            {
                nameElement: 'city',
                element: element(by.css('.city input')), data: 'Odessa'
            },
            {
                nameElement: 'postcode',
                element: element(by.css('.postcode input')), data: 65000
            },
            {
                nameElement: 'street',
                element: element(by.css('.street input')), data: 'Pastera'
            },
            {
                nameElement: 'street2',
                element: element(by.css('.street2 input')), data: 'Tennistaya'
            },
            {
                nameElement: 'vatid',
                element: element(by.css('.vatid input')), data: 465787
            }
        ];
        // second CRUD level
        this.inputElementsOnSecondLevel = [
            {
                nameElement: 'firstname',
                element: element(by.css('.firstname input')), data: 'Josh'
            },
            {
                nameElement: 'surename',
                element: element(by.css('.surename input')), data: 'Tomas'
            },
            {
                nameElement: 'phone',
                element: element(by.css('.phone input')), data: '43-458-05'
            },
            {
                nameElement: 'mobilePhone',
                element: element(by.css('.mobilePhone input')), data: '0975486397'
            },
            {
                nameElement: 'emailAddress',
                element: element(by.css('.emailAddress input')), data: 'polin@gmail.com'
            }
        ];
    }
    CreatePage.prototype.isVisibleHint = function () {
        return this.hint.getCssValue('display')
            .then(function (res) {
            return Promise.resolve(res);
        });
    };
    CreatePage.prototype.fillInputFields = function (inputElements) {
        var _this = this;
        inputElements.forEach(function (i) {
            waitUntilReady_1.WaitUntilReady.waitUntilReady(i.element, _this._ptor);
            i.element.sendKeys(i.data);
        });
    };
    CreatePage.prototype.fillLinkset = function () {
        for (var i in this.selectElements) {
            if (this.selectElements.hasOwnProperty(i)) {
                waitUntilReady_1.WaitUntilReady.waitUntilReady(this.selectElements[i], this._ptor);
                this.selectElements[i].click();
                if (i === 'contacts') {
                    this.createRecordOnSecondLevel();
                }
                browser.sleep(300);
                this.clickOnSelectAll();
                this.clickOnAddLinkBtn();
            }
        }
    };
    CreatePage.prototype.fillEmbeddedList = function () {
        for (var i in this.embeddedListElements) {
            if (this.embeddedListElements.hasOwnProperty(i)) {
                waitUntilReady_1.WaitUntilReady.waitUntilReady(this.embeddedListElements[i], this._ptor);
                this.embeddedListElements[i].click();
                var lastOptionElement = element(by.css('.' + i + ' option:last-of-type'));
                waitUntilReady_1.WaitUntilReady.waitUntilReady(lastOptionElement, this._ptor);
                lastOptionElement.click();
            }
        }
    };
    CreatePage.prototype.createRecordOnSecondLevel = function () {
        this.clickOnBtnAddRecord();
        this.fillInputFields(this.inputElementsOnSecondLevel);
        this.fillEmbeddedList();
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    };
    CreatePage.prototype.clickOnContactsLinksetBtn = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.selectElements.contacts, this._ptor);
        this.selectElements.contacts.click();
    };
    CreatePage.prototype.clickOnBackBtn = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.backBtn, this.ptor);
        this.backBtn.click();
    };
    CreatePage.prototype.clickOnAddLinkBtn = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.addLinkBtn, this._ptor);
        this.addLinkBtn.click();
    };
    CreatePage.prototype.clickOnSelectAll = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.selectAll, this._ptor);
        this.selectAll.click();
    };
    CreatePage.prototype.clickOnBtnAddRecord = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.btnAddRecord, this.ptor);
        this.btnAddRecord.click();
    };
    CreatePage.prototype.clickOnFormBtn = function () {
        waitUntilReady_1.WaitUntilReady.waitUntilReady(this.formBtn, this.ptor);
        this.formBtn.click();
    };
    Object.defineProperty(CreatePage.prototype, "ptor", {
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
    return CreatePage;
}());
exports.CreatePage = CreatePage;
//# sourceMappingURL=crud.create.page.js.map