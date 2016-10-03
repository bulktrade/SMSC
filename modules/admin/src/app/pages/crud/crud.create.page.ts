import { InputElement } from '../model/inputElement';

export class CreatePage {
    public hint = element(by.css('.companyName md-hint'));
    public selectAll = by.id('select-all');
    public addLinkBtn = by.id('addLink');
    public btnAddRecord = by.id('addRow');
    public formBtn = by.id('modify');
    public backBtn = by.id('back');
    public overlay = element(by.id('overlay'));

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

    constructor() {
    }

    isVisibleHint() {
        return this.hint.isPresent();
    }

    fillInputFields(inputElements: Array<InputElement>) {
        let promises = [];

        inputElements.forEach(i => {
            promises.push(
                this._ptor.wait(i.element, 5000)
                    .then((el: webdriver.IWebElement) => {
                        return Promise.resolve(el.sendKeys(i.data));
                    })
            );
        });

        return Promise.all(promises);
    }

    chooseContacts() {
        return this._ptor.wait(protractor.until.elementLocated(
            this.selectElements.contacts), 5000)
            .then((el: webdriver.IWebElement) => {
                el.click();

                return this.createRecordOnSecondLevel()
                    .then(() => {
                        return this.clickOnSelectAll()
                            .then(() => {
                                return this.clickOnAddLinkBtn();
                            });
                    });
            });
    }

    chooseUsers() {
        return this._ptor.wait(protractor.until.elementLocated(this.selectElements.users), 5000)
            .then((el: webdriver.IWebElement) => {
                el.click();

                return this.clickOnSelectAll()
                    .then(() => {
                        this.clickOnAddLinkBtn()
                            .then(() => {
                                this.clickOnFormBtn()
                                    .then(() => {
                                        this.clickOnBackBtn();
                                    });
                            });
                    });
            });
    }

    fillLinkset() {
        return this.chooseContacts()
            .then(() => {
                return this.chooseUsers();
            });
    }

    fillEmbeddedList() {
        let promises = [];

        for (let i in this.embeddedListElements) {
            if (this.embeddedListElements.hasOwnProperty(i)) {
                promises.push(
                    this._ptor.wait(protractor.until.elementLocated(
                        this.embeddedListElements[i]), 5000)
                        .then((el: webdriver.IWebElement) => {
                            el.click();

                            let lastOptionElement = by.css('.' + i + ' option:last-of-type');

                            this._ptor.wait(protractor.until.elementLocated(
                                lastOptionElement), 5000)
                                .then((lastOptionElement: webdriver.IWebElement) => {
                                    lastOptionElement.click();
                                });
                        })
                );
            }
        }

        return Promise.all(promises);
    }

    fillInputFieldsOnSecondLevel() {
        let promises = [];

        this.inputElementsOnSecondLevel.forEach(i => {
            promises.push(
                this._ptor.wait(protractor.until.elementLocated(i.element), 5000)
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
                        return this.fillEmbeddedList()
                            .then(() => {
                                return this.clickOnFormBtn()
                                    .then(() => {
                                        return this.clickOnBackBtn();
                                    });
                            });
                    });
            });
    }

    clickOnContactsLinksetBtn() {
        return this._ptor.wait(protractor.until.elementLocated(by.css('.contacts #add')), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBackBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.backBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnAddLinkBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.addLinkBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnSelectAll() {
        return this._ptor.wait(protractor.until.elementLocated(this.selectAll), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBtnAddRecord() {
        return this._ptor.wait(protractor.until.elementLocated(this.btnAddRecord), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnFormBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.formBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
