export class BindingParameterPage {
    public bindingParameterItem = by.className('metadatapropertybindingparameter');
    public bindingParameterDirective = by.tagName('binding-parameter');

    public fromPropertyField = by.css('.fromProperty input');
    public toPropertyField = by.css('.toProperty input');
    public combineOperatorSelect = by.className('combineOperator');
    public operatorSelect = by.className('operator');
    public bingingPropertiesSelect = by.css('.bingingProperties #add');
    public chooseFirstLinkElement = by.css(
        '.ag-body-container > div:first-of-type .ag-selection-checkbox');
    public addLinkBtn = by.id('addLink');

    public contactsEdit = element.all(by.xpath('.//*[.="contacts"]/preceding-sibling::div')).get(2);

    private _prot;
    private _timeWait: number = 5000;

    fillForm() {
        return this.sendKeysFromPropertyField('customer')
            .then(() => {
                return this.sendKeysToPropertyField('@rid')
                    .then(() => {
                        return this.chooseCombineOperatorSelect()
                            .then(() => {
                                return this.chooseOperatorSelect();
                            })
                    })
            })
    }

    chooseCombineOperatorSelect() {
        return this._prot.wait(protractor.until.elementLocated(
            this.combineOperatorSelect), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return el.click()
                    .then(() => {
                        let lastElement = by.css('.combineOperator option:nth-of-type(3)');

                        return this._prot.wait(protractor.until.elementLocated(
                            lastElement), this._timeWait)
                            .then((lastOptionElement: webdriver.IWebElement) => {
                                return lastOptionElement.click();
                            });
                    });
            });
    }

    chooseOperatorSelect() {
        return this._prot.wait(protractor.until.elementLocated(
            this.operatorSelect), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return el.click()
                    .then(() => {
                        let lastElement = by.css('.operator option:nth-of-type(2)');

                        return this._prot.wait(protractor.until.elementLocated(
                            lastElement), this._timeWait)
                            .then((lastOptionElement: webdriver.IWebElement) => {
                                return lastOptionElement.click();
                            });
                    });
            });
    }

    clickOnContactsEdit() {
        return this.contactsEdit.click();
    }

    chooseBindingParameter() {
        return this._prot.wait(protractor.until.elementLocated(
            this.bingingPropertiesSelect), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return el.click()
                    .then(() => {
                        return this.chooseFirstLink()
                            .then(() => {
                                return this.clickOnAddLinkBtn();
                            });
                    });
            });
    }

    clickOnAddLinkBtn() {
        return this._prot.wait(protractor.until.elementLocated(this.addLinkBtn), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    chooseFirstLink() {
        return this._prot.wait(protractor.until.elementLocated(
            this.chooseFirstLinkElement), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    sendKeysFromPropertyField(value) {
        return this._prot.wait(protractor.until.elementLocated(this.fromPropertyField), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.sendKeys(value));
            });
    }

    sendKeysToPropertyField(value) {
        return this._prot.wait(protractor.until.elementLocated(this.toPropertyField), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.sendKeys(value));
            });
    }

    isDisplayedBindingParameterDirective() {
        return this._prot.wait(protractor.until.elementLocated(this.bindingParameterDirective), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.isDisplayed());
            });
    }

    clickOnBindingParameterItem() {
        return this._prot.wait(protractor.until.elementLocated(this.bindingParameterItem), this._timeWait)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    get prot() {
        return this._prot;
    }

    set prot(value) {
        this._prot = value;
    }
}