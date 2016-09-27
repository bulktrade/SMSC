import {Dashboard} from './dashboard.page';

describe('Navigation', () => {
    let prot = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.dashboard = new Dashboard();
        this.dashboard.get();
        prot = protractor.wrapDriver(browser.driver);
    });

    //  Sign in
    it('Try to login login', () => {
        this.dashboard.login_();
    });

    //  Check page title
    it('Test title', () => {
        let result = 'SMSC Admin';

        this.dashboard.getTitle().then((res) => {
            expect(this.dashboard.getTitle()).toBe(result);
        });
    });

    //  Check by existing dashboard
    it('Check by existing dashboard', () => {
        this.dashboard.clickOnItemNavDashboard(prot).then(() => {
    expect(this.dashboard.getDashboard()).toBeTruthy();
    });
    });

    //  Switch to fullscreen mode
    it('Click on fullscreen icon', () => {
       this.dashboard.clickOnFullscreenIcon(prot).then(() => {
           expect(this.dashboard.getFullscreenIcon()).toBeTruthy();
       });
    });

    //  Switch off fullscreen mode by press Escape key
    it('Press ESC key', () => {
        this.dashboard.pressCloseFullscreenESC(prot);
    });

    //  Open/Close crud box tool
    it('Open/Close crud box tool', () => {
       this.dashboard.clickOnCloseIcon(prot);
    });

    //  Create box
    it('Create box', () => {
        this.dashboard.createBox(prot);
    });

    //  Open box crud tool and go to edit form
    it('Open edit form and save', () => {
        this.dashboard.clickOnCrudIcon(prot, this.dashboard.fillForm).then(() => {
            expect(this.dashboard.getCrudIcon()).toBeTruthy();
        });
    });

    //  Change size mode
    it('Switch height box mode', () => {
        this.dashboard.clickOnSizeButtons(prot);
    });

    //  Remove box
    it('Remove box', () => {
        this.dashboard.removeBox(prot);
    });
});
