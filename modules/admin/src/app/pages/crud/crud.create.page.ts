import { InputElement } from '../model/inputElement';

export class CreatePage {
    public hint = element(by.css('.companyName md-hint'));
    public contactsHint = by.css('.contacts .md-hint');
    public usersHint = by.css('.users .md-hint');
    public selectAll = by.id('select-all');
    public addLinkBtn = by.id('addLink');
    public btnAddRecord = by.id('addRow');
    public formBtn = by.id('modify');
    public backBtn = by.id('back');
    public chooseFirstLink = by.css('.ag-body-container > div:first-of-type .ag-selection-checkbox');

    public selectElements = {
        contacts: by.css('.contacts #add'),
        users: by.css('.users #add')
    };

    public embeddedListElements = {
        type: by.className('type'),
        salutation: by.className('salutation')
    };

    // first CRUD level
    public inputElementsOnFirstLevel: Array<InputElement> = [
        {
            nameElement: 'customerId',
            element: element(by.css('.customerId input')), data: '1'
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
            element: element(by.css('.postcode input')), data: '65000'
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
            element: element(by.css('.vatid input')), data: '465787'
        }
    ];

    // second CRUD level
    public inputElementsOnSecondLevel: Array<InputElement> = [
        {
            nameElement: 'firstname',
            element: by.css('.firstname input'), data: 'Josh'
        },
        {
            nameElement: 'surename',
            element: by.css('.surename input'), data: 'Tomas'
        },
        {
            nameElement: 'phone',
            element: by.css('.phone input'), data: '43-458-05'
        },
        {
            nameElement: 'mobilePhone',
            element: by.css('.mobilePhone input'), data: '0975486397'
        },
        {
            nameElement: 'emailAddress',
            element: by.css('.emailAddress input'), data: 'polin@gmail.com'
        }
    ];

    private _ptor;
    private timeWait: number = 10000;

    constructor() {
    }

    isVisibleHint() {
        return this.hint.isPresent();
    }

    fillInputFields(inputElements: Array<InputElement>) {
        let promises = [];

        inputElements.forEach(i => {
            promises.push(
                this._ptor.wait(i.element, this.timeWait)
                    .then((el: webdriver.IWebElement) => {
                        return Promise.resolve(el.sendKeys(i.data));
                    })
            );
        });

        return Promise.all(promises);
    }

    chooseContacts() {
        return this._ptor.wait(protractor.until.elementLocated(
            this.selectElements.contacts), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return el.click()
                    .then(() => {
                        return this.createRecordOnSecondLevel()
                            .then(() => {
                                return this.clickOnSelectAll()
                                    .then(() => {
                                        return this.clickOnAddLinkBtn();
                                    });
                            });
                    });
            });
    }

    chooseUsers() {
        return this._ptor.wait(protractor.until.elementLocated(this.selectElements.users), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return el.click()
                    .then(() => {
                        return this.clickOnChooseFirstLink()
                            .then(() => {
                                return this.clickOnAddLinkBtn();
                            });
                    });
            });
    }

    fillLinkset() {
        return this.chooseUsers()
            .then(() => {
                return this.chooseContacts();
            });
    }

    fillEmbeddedType() {
        return this._ptor.wait(protractor.until.elementLocated(
            this.embeddedListElements.type), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return el.click()
                    .then(() => {
                        let lastElement = by.css('.type option:last-of-type');

                        return this._ptor.wait(protractor.until.elementLocated(
                            lastElement), this.timeWait)
                            .then((lastOptionElement: webdriver.IWebElement) => {
                                return lastOptionElement.click();
                            });
                    });
            });
    }

    fillEmbeddedSalutationType() {
        return this._ptor.wait(protractor.until.elementLocated(
            this.embeddedListElements.salutation), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return el.click()
                    .then(() => {
                        let lastElement = by.css('.salutation option:last-of-type');

                        return this._ptor.wait(protractor.until.elementLocated(
                            lastElement), this.timeWait)
                            .then((lastOptionElement: webdriver.IWebElement) => {
                                return lastOptionElement.click();
                            });
                    });
            });
    }

    fillInputFieldsOnSecondLevel() {
        let promises = [];

        this.inputElementsOnSecondLevel.forEach(i => {
            promises.push(
                this._ptor.wait(protractor.until.elementLocated(i.element), this.timeWait)
                    .then((el: webdriver.IWebElement) => {
                        return Promise.resolve(el.sendKeys(i.data));
                    })
            );
        });

        return Promise.all(promises);
    }

    createRecordOnSecondLevel() {
        return this.clickOnBtnAddRecord()
            .then(() => {
                return this.fillInputFieldsOnSecondLevel()
                    .then(() => {
                        return this.fillEmbeddedType()
                            .then(() => {
                                return this.fillEmbeddedSalutationType()
                                    .then(() => {
                                        return this.clickOnFormBtn()
                                            .then(() => {
                                                return this.clickOnBackBtn();
                                            });
                                    });
                            });
                    });
            });
    }

    clickOnContactsLinksetBtn() {
        return this._ptor.wait(protractor.until.elementLocated(by.css('.contacts #add')), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBackBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.backBtn), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnAddLinkBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.addLinkBtn), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnSelectAll() {
        return this._ptor.wait(protractor.until.elementLocated(this.selectAll), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBtnAddRecord() {
        return this._ptor.wait(protractor.until.elementLocated(this.btnAddRecord), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    isEnabledFormButton() {
        return this._ptor.wait(protractor.until.elementLocated(this.formBtn), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isEnabled());
            });
    }

    clickOnFormBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.formBtn), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnChooseFirstLink() {
        return this._ptor.wait(protractor.until.elementLocated(this.chooseFirstLink), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    isPresentContactsHint() {
        return this._ptor.wait(protractor.until.elementLocated(this.contactsHint), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isDisplayed());
            });
    }

    isPresentUsersHint() {
        return this._ptor.wait(protractor.until.elementLocated(this.usersHint), this.timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isDisplayed());
            });
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
