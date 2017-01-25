// import { BreadcrumbPage } from './breadcrumb.page';
//
// describe('Breadcrumb', () => {
//     let breadcrumb: BreadcrumbPage = new BreadcrumbPage();
//     let ptor = protractor.wrapDriver(browser.driver);
//
//     beforeEach(() => {
//         ptor = protractor.wrapDriver(browser.driver);
//     });
//
//     it('log in smsc.io', () => {
//         let width = 1024,
//             height = 768;
//         ptor.manage().window().setSize(width, height);
//
//         breadcrumb.get();
//         breadcrumb.login.login();
//         expect(breadcrumb.isPresentLogo()).toBeTruthy();
//     });
//
//     it('should display breadcrumb', () => {
//         expect(breadcrumb.isPresentBreadcrumb()).toBeTruthy();
//     });
//
//     it('should not display breadcrumb', () => {
//         let width = 762,
//             height = 768;
//         ptor.manage().window().setSize(width, height);
//
//         expect(breadcrumb.isPresentMainContent()).toBeTruthy();
//         expect(breadcrumb.breadcrumbTag.isDisplayed()).toBeFalsy();
//     });
//
//     it('should logout', () => {
//         breadcrumb.login.logout();
//         expect(breadcrumb.login.isPresentLogin()).toBeTruthy();
//     });
// });
