import {Dashboard} from './dashboard.page';

//import by = protractor.By;

describe('Navigation', () => {
    let ptor = protractor.wrapDriver(browser.driver);

    beforeEach(() => {
        this.dashboard = new Dashboard();
        this.dashboard.get();
        ptor = protractor.wrapDriver(browser.driver);
    });

     it('Try to login login', () => {
         this.dashboard.login_();
     });

     it('Test title', () => {
         let result = 'SMSC Admin';

         console.log('Trace title');

         this.dashboard.getTitle().then((res) => {
            expect(this.dashboard.getTitle()).toBe(result);
         });
     });

     it('Should have dashboard', () => {
         this.dashboard.clickOnItemNavDashboard(ptor).then(() => {
            expect(this.dashboard.getDashboard()).toBeTruthy();
         });
     });

    it('Should have crud icon', () => {
        this.dashboard.clickOnCrudIcon(ptor).then(() => {
            expect(this.dashboard.getCrudIcon).toBeTruthy();
        })
    });

    it('Should have edit icon', () => {
        this.dashboard.clickOnCrudIcon(ptor).then(() => {
            expect(this.dashboard.getCrudIcon).toBeTruthy();
        })
    });
});
