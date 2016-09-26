import { WaitUntilReady } from "../common/waitUntilReady";
import { InputElement } from "../model/inputElement";
export class CreatePage {
    private _ptor;

    public hint = element(by.css('.companyName md-hint'));
    public selectAll = element(by.css('.ag-body-container > div:first-of-type .ag-selection-checkbox'));
    public addLinkBtn = element(by.id('addLink'));
    public btnAddRecord = element(by.id('addRow'));
    public formBtn = element(by.id('modify'));
    public backBtn = element(by.id('back'));

    public selectElements = {
        contacts: element(by.css('.contacts #add')),
        users: element(by.css('.users #add'))
    };

    public embeddedListElements = {
        type: element(by.className('type')),
        salutation: element(by.className('salutation'))
    };

    /** first CRUD level **/
    public inputElementsOnFirstLevel: Array<InputElement> = [
        { nameElement: 'customersId', element: element(by.css('.customerId input')), data: 1 },
        { nameElement: 'companyName', element: element(by.css('.companyName input')), data: 'SMSC' },
        { nameElement: 'country', element: element(by.css('.country input')), data: 'Ukraine' },
        { nameElement: 'city', element: element(by.css('.city input')), data: 'Odessa' },
        { nameElement: 'postcode', element: element(by.css('.postcode input')), data: 65000 },
        { nameElement: 'street', element: element(by.css('.street input')), data: 'Pastera' },
        { nameElement: 'street2', element: element(by.css('.street2 input')), data: 'Tennistaya' },
        { nameElement: 'vatid', element: element(by.css('.vatid input')), data: 465787 }
    ];

    /** second CRUD level **/
    public inputElementsOnSecondLevel: Array<InputElement> = [
        { nameElement: 'firstname', element: element(by.css('.firstname input')), data: 'Josh' },
        { nameElement: 'surename', element: element(by.css('.surename input')), data: 'Tomas' },
        { nameElement: 'phone', element: element(by.css('.phone input')), data: '43-458-05' },
        { nameElement: 'mobilePhone', element: element(by.css('.mobilePhone input')), data: '0975486397' },
        { nameElement: 'emailAddress', element: element(by.css('.emailAddress input')), data: 'polin@gmail.com' }
    ];

    isVisibleHint() {
        return this.hint.getCssValue('display')
            .then(res => {
                return Promise.resolve(res);
            })
    }

    fillInputFields(inputElements: Array<InputElement>) {
        inputElements.forEach(i => {
            WaitUntilReady.waitUntilReady(i.element, this._ptor);

            i.element.sendKeys(i.data);
        });
    }

    fillLinkset() {
        for (let i in this.selectElements) {
            WaitUntilReady.waitUntilReady(this.selectElements[i], this._ptor);
            this.selectElements[i].click();

            if (i === 'contacts') {
                this.createRecordOnSecondLevel();
            }

            browser.sleep(300);
            this.clickOnSelectAll();
            this.clickOnAddLinkBtn();
        }
    }

    fillEmbeddedList() {
        for (let i in this.embeddedListElements) {
            WaitUntilReady.waitUntilReady(this.embeddedListElements[i], this._ptor);
            this.embeddedListElements[i].click();

            let lastOptionElement = element(by.css('.' + i + ' option:last-of-type'));

            WaitUntilReady.waitUntilReady(lastOptionElement, this._ptor);
            lastOptionElement.click();
        }
    }

    createRecordOnSecondLevel() {
        this.clickOnBtnAddRecord();
        this.fillInputFields(this.inputElementsOnSecondLevel);
        this.fillEmbeddedList();
        this.clickOnFormBtn();
        this.clickOnBackBtn();
    }

    clickOnContactsLinksetBtn() {
        WaitUntilReady.waitUntilReady(this.selectElements.contacts, this._ptor);
        this.selectElements.contacts.click();
    }

    clickOnBackBtn() {
        WaitUntilReady.waitUntilReady(this.backBtn, this.ptor);
        this.backBtn.click();
    }

    clickOnAddLinkBtn() {
        WaitUntilReady.waitUntilReady(this.addLinkBtn, this._ptor);
        this.addLinkBtn.click();
    }

    clickOnSelectAll() {
        WaitUntilReady.waitUntilReady(this.selectAll, this._ptor);
        this.selectAll.click();
    }

    clickOnBtnAddRecord() {
        WaitUntilReady.waitUntilReady(this.btnAddRecord, this.ptor);
        this.btnAddRecord.click();
    }

    clickOnFormBtn() {
        WaitUntilReady.waitUntilReady(this.formBtn, this.ptor);
        this.formBtn.click();
    }

    /** getters and setters **/

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
