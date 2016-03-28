describe('Navigation', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular2 Admin';
    expect(subject).toBe(result);
  });

  it('should have side-bar', () => {
    let subject = element(by.className('side-bar')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have dashboard', () => {
    let subject = element(by.className('dashboard')).getText();
    let result  = 'Dashboard';
    expect(subject).toEqual(result);
  });

});
