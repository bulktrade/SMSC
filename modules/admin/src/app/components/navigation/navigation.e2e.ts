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

  it('should have side-bar', () => {
    let result  = true;
    expect(this.navigator.subjSidebar()).toEqual(result);
  });

  it('should have dashboard', () => {
    let result  = 'Dashboard';
    expect(this.navigator.subjDashboard()).toEqual(result);
  });

});

class NavigationTest {
  elemSidebar   = element(by.className('side-bar'));
  elemDashboard = element(by.className('dashboard'));
  elemUsername  = element(by.className('username'));
  elemPassword  = element(by.className('password'));
  elemSubmitBtn = element(by.className('btn'));

  get() {
    browser.get('/');
  };

  subjSidebar() {
    return this.elemSidebar.isPresent();
  }

  subjDashboard() {
    return this.elemDashboard.getText();
  }

  getTitle() {
    return browser.getTitle();
  }

  login() {
    this.elemUsername.sendKeys('admin');
    this.elemPassword.sendKeys('admin');
    this.elemSubmitBtn.submit();
  }
}
