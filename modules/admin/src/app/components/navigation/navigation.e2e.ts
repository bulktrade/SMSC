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
    expect(this.navigator.getSmstraffic()).toBeDefined();
  });
  
  it('should have dlrtraffic', () => {
    this.navigator.clickOnItemNavDlrtraffic();
    expect(this.navigator.getDlrtraffic()).toBeDefined();
  });

  it('should have finances', () => {
    this.navigator.clickOnItemNavFinances();
    expect(this.navigator.getFinances()).toBeDefined();
  });

  it('should have customers', () => {
    this.navigator.clickOnItemNavCustomers();
    expect(this.navigator.getCustomers()).toBeDefined();
  });

  it('should have monitoring', () => {
    this.navigator.clickOnItemNavMonitoring();
    expect(this.navigator.getMonitoring()).toBeDefined();
  });

  it('should have carriers', () => {
    this.navigator.clickOnItemNavCarriers();
    expect(this.navigator.getCarriers()).toBeDefined();
  });

  it('should have routing', () => {
    this.navigator.clickOnItemNavRouting();
    expect(this.navigator.getRouting()).toBeDefined();
  });

  it('should have prices', () => {
    this.navigator.clickOnItemNavPrices();
    expect(this.navigator.getPrices()).toBeDefined();
  });

  it('should have mccmnc', () => {
    this.navigator.clickOnItemNavMccmnc();
    expect(this.navigator.getMccmnc()).toBeDefined();
  });

  it('should have smpp', () => {
    this.navigator.clickOnItemNavSmpp();
    expect(this.navigator.getSmpp()).toBeDefined();
  });

  it('should have api', () => {
    this.navigator.clickOnItemNavApi();
    expect(this.navigator.getApi()).toBeDefined();
  });

  it('should have systemsettings', () => {
    this.navigator.clickOnItemNavSystemsettings();
    expect(this.navigator.getSystemsettings()).toBeDefined();
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
  
  // the object event handler click
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
  getSmstraffic() {
    return this.smstraffic;
  }

  clickOnItemNavDlrtraffic() {
    return this.btnDlrtraffic.click();
  }
  getDlrtraffic() {
    return this.dlrtraffic;
  }

  clickOnItemNavFinances() {
    return this.btnFinances.click();
  }
  getFinances() {
    return this.finances;
  }

  clickOnItemNavCustomers() {
    return this.btnCusomers.click();
  }
  getCustomers() {
    return this.customers;
  }

  clickOnItemNavMonitoring() {
    return this.btnMonitoring.click();
  }
  getMonitoring() {
    return this.monitoring;
  }

  clickOnItemNavCarriers() {
    return this.btnCarriers.click();
  }
  getCarriers() {
    return this.carriers;
  }

  clickOnItemNavRouting() {
    return this.btnRouting.click();
  }
  getRouting() {
    return this.routing;
  }

  clickOnItemNavPrices() {
    return this.btnPrices.click();
  }
  getPrices() {
    return this.prices;
  }

  clickOnItemNavMccmnc() {
    return this.btnMccmnc.click();
  }
  getMccmnc() {
    return this.mccmnc;
  }

  clickOnItemNavSmpp() {
    return this.btnSmpp.click();
  }
  getSmpp() {
    return this.smpp;
  }

  clickOnItemNavApi() {
    return this.btnApi.click();
  }
  getApi() {
    return this.api;
  }

  clickOnItemNavSystemsettings() {
    return this.btnSystemsettings.click();
  }
  getSystemsettings() {
    return this.systemsettings;
  }

}
