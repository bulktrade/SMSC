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
    /*it('Click on fullscreen icon', () => {
       this.dashboard.clickOnFullscreenIcon(prot).then(() => {
           expect(this.dashboard.getFullscreenIcon()).toBeTruthy();
       });
    });*/

    //  Open box crud tool and go to edit form
    it('Click on crud icon', () => {
        this.dashboard.clickOnCrudIcon(prot).then(() => {
            expect(this.dashboard.getCrudIcon()).toBeTruthy();
        })
    });

    //  Switch off fullscreen mode by press Escape key
    /*it('Press ESC key', () => {
       this.dashboard.pressCloseFullscreenESC(prot);
    });*/

    //  Check height mode
    /*it('Switch height box mode', () => {
        this.dashboard.clickOnSizeButtons(prot);
    });*/

    //  Close box crud tool
    /*it('Click have close icon', () => {
        this.dashboard.clickOnCloseIcon().then(() => {
            expect(this.dashboard.getCloseIcon()).toBeTruthy();
        });
    });

    //  Click on edit box
    it('Click on box edit icon', () => {
        this.dashboard.clickOnCrudIcon(prot).then(() => {
            expect(this.dashboard.getCrudIcon).toBeTruthy();
        })
    });*/
});
