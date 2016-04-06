describe('Navigation', () => {

  beforeEach(() => {
    this.navigator = new NavigationTest();
    this.navigator.get();
  });

  it('log in for user admin', () => {
    this.navigator.login();
    expect(true).toBeTruthy();
  });

  it('should have a title', () => {
    let result  = 'Angular2 Admin';
    expect(this.navigator.getTitle()).toBe(result);
  });

  it('should have smstraffic', () => {
    this.navigator.clickOnItemNavSmstraffic();
    expect(this.navigator.getTextSmstraffic()).toBeDefined();
  });
  
  it('should have dlrtraffic', () => {
    this.navigator.clickOnItemNavDlrtraffic();
    expect(this.navigator.getTextDlrtraffic()).toBeDefined();
  });

  it('should have finances', () => {
    this.navigator.clickOnItemNavFinances();
    expect(this.navigator.getTextFinances()).toBeDefined();
  });

  it('should have customers', () => {
    this.navigator.clickOnItemNavCustomers();
    expect(this.navigator.getTextCustomers()).toBeDefined();
  });

  it('should have monitoring', () => {
    this.navigator.clickOnItemNavMonitoring();
    expect(this.navigator.getTextMonitoring()).toBeDefined();
  });

  it('should have carriers', () => {
    this.navigator.clickOnItemNavCarriers();
    expect(this.navigator.getTextCarriers()).toBeDefined();
  });

  it('should have routing', () => {
    this.navigator.clickOnItemNavRouting();
    expect(this.navigator.getTextRouting()).toBeDefined();
  });

  it('should have prices', () => {
    this.navigator.clickOnItemNavPrices();
    expect(this.navigator.getTextPrices()).toBeDefined();
  });

  it('should have mccmnc', () => {
    this.navigator.clickOnItemNavMccmnc();
    expect(this.navigator.getTextMccmnc()).toBeDefined();
  });

  it('should have smpp', () => {
    this.navigator.clickOnItemNavSmpp();
    expect(this.navigator.getTextSmpp()).toBeDefined();
  });

  it('should have api', () => {
    this.navigator.clickOnItemNavApi();
    expect(this.navigator.getTextApi()).toBeDefined();
  });

  it('should have systemsettings', () => {
    this.navigator.clickOnItemNavSystemsettings();
    expect(this.navigator.getTextSystemsettings()).toBeDefined();
  });

});

class NavigationTest {
  // elements login page
  elemUsername  = element(by.className('username'));
  elemPassword  = element(by.className('password'));
  elemSubmitBtn = element(by.className('btn'));

  // is there a tag
  smstraffic = element(by.tagName('smstraffic'));
  dlrtraffic = element(by.tagName('dlrtraffic'));
  finances = element(by.tagName('finances'));
  customers = element(by.tagName('customers'));
  monitoring = element(by.tagName('monitoring'));
  carriers = element(by.tagName('carriers'));
  routing = element(by.tagName('routing'));
  prices = element(by.tagName('prices'));
  mccmnc = element(by.tagName('mccmnc'));
  smpp = element(by.tagName('smpp'));
  api = element(by.tagName('api'));
  systemsettings = element(by.tagName('systemsettings'));
  
  // the object event handler click()
  btnSmstraffic = element(by.className('smstraffic'));
  btnDlrtraffic = element(by.className('dlrtraffic'));
  btnFinances = element(by.className('finances'));
  btnCusomers = element(by.className('customers'));
  btnMonitoring = element(by.className('monitoring'));
  btnCarriers = element(by.className('carriers'));
  btnRouting = element(by.className('routing'));
  btnPrices = element(by.className('prices'));
  btnMccmnc = element(by.className('mccmnc'));
  btnSmpp = element(by.className('smpp'));
  btnApi = element(by.className('api'));
  btnSystemsettings = element(by.className('systemsettings'));

  get() {
    browser.get('/');
  };

  getTitle() {
    return browser.getTitle();
  }

  login() {
    this.elemUsername.sendKeys('admin');
    this.elemPassword.sendKeys('admin');
    this.elemSubmitBtn.submit();
  }

  clickOnItemNavSmstraffic() {
    return this.btnSmstraffic.click();
  }
  getTextSmstraffic() {
    return this.smstraffic.getInnerHtml();
  }

  clickOnItemNavDlrtraffic() {
    return this.btnDlrtraffic.click();
  }
  getTextDlrtraffic() {
    return this.dlrtraffic.getInnerHtml();
  }

  clickOnItemNavFinances() {
    return this.btnFinances.click();
  }
  getTextFinances() {
    return this.finances.getInnerHtml();
  }

  clickOnItemNavCustomers() {
    return this.btnCusomers.click();
  }
  getTextCustomers() {
    return this.customers.getInnerHtml();
  }

  clickOnItemNavMonitoring() {
    return this.btnMonitoring.click();
  }
  getTextMonitoring() {
    return this.monitoring.getInnerHtml();
  }

  clickOnItemNavCarriers() {
    return this.btnCarriers.click();
  }
  getTextCarriers() {
    return this.carriers.getInnerHtml();
  }

  clickOnItemNavRouting() {
    return this.btnRouting.click();
  }
  getTextRouting() {
    return this.routing.getInnerHtml();
  }

  clickOnItemNavPrices() {
    return this.btnPrices.click();
  }
  getTextPrices() {
    return this.prices.getInnerHtml();
  }

  clickOnItemNavMccmnc() {
    return this.btnMccmnc.click();
  }
  getTextMccmnc() {
    return this.mccmnc.getInnerHtml();
  }

  clickOnItemNavSmpp() {
    return this.btnSmpp.click();
  }
  getTextSmpp() {
    return this.smpp.getInnerHtml();
  }

  clickOnItemNavApi() {
    return this.btnApi.click();
  }
  getTextApi() {
    return this.api.getInnerHtml();
  }

  clickOnItemNavSystemsettings() {
    return this.btnSystemsettings.click();
  }
  getTextSystemsettings() {
    return this.systemsettings.getInnerHtml();
  }

}
