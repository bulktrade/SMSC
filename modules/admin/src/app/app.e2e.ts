import {AppTest} from './app.page.ts';

describe('App', () => {
  let ptor = protractor.wrapDriver(browser.driver);

  beforeEach(() => {
    this.apptest = new AppTest();
    ptor = protractor.wrapDriver(browser.driver);
    this.apptest.get();
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'SMSC Admin';
    expect(subject).toEqual(result);
  });

  it('should have input username', () => {
    this.apptest.waitUntilReady(this.apptest.elemUsername, ptor);
    let result  = true;
    expect(this.apptest.isPresentUsername()).toEqual(result);
  });

  it('should have input password', () => {
    this.apptest.waitUntilReady(this.apptest.elemPassword, ptor);
    let result  = true;
    expect(this.apptest.isPresentPassword()).toEqual(result);
  });

  it('should have button submit', () => {
    this.apptest.waitUntilReady(this.apptest.elemBtn, ptor);
    let result  = true;
    expect(this.apptest.isPresentBtn()).toEqual(result);
  });

});
