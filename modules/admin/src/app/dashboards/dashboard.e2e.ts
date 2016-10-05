import {Dashboard} from './dashboard.page';

describe('Dashboard', () => {
    let prot = protractor.wrapDriver(browser.driver);

    prot.manage().window().setSize(1024, 1020);
    browser.get(browser.baseUrl + '/');
    //browser.get('/');
    //browser.get('/admin/');

    beforeEach(() => {
        this.dashboard = new Dashboard();
        prot = protractor.wrapDriver(browser.driver);
        this.dashboard.prot = prot;
    });

    //  Sign in
    it('Try to login login', () => {
        this.dashboard.login.login();
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

    //  Drag and drop box
    it('Drag and drop box', () => {
        //this.dashboard.dragAndDrop();
    });

    //  Switch to fullscreen mode
    it('Click on fullscreen icon', () => {
        this.dashboard.clickOnFullscreenIcon(prot);
        browser.sleep(1000);
    });

    //  Open/Close crud box tool
    it('Open/Close crud box tool', () => {
        this.dashboard.toggleCloseIcon();
        browser.sleep(1000);
    });

    //  Change size mode
    it('Switch height box mode', () => {
        this.dashboard.clickOnSizeButtons();
        browser.sleep(2000);
    });

    //  Create box
    it('Create box', () => {
        let this_ = this;

        this_.dashboard.createBox().then(() => {
            browser.sleep(2000);
            this_.dashboard.editBox().then(() => {
                browser.sleep(2000);
                this_.dashboard.removeBox().then(() => {
                    console.log('Remove box');
                });
            });

        });
    });

    it('Finish', () => {
        this.dashboard.finish();
    });
});
