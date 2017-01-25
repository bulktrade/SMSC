// import {NavigationPage} from "./navigation.page";
//
// describe('NavigationComponent', () => {
//     let navigator = new NavigationPage();
//     let ptor = protractor.wrapDriver(browser.driver);
//
//     beforeEach(() => {
//         ptor = protractor.wrapDriver(browser.driver);
//     });
//
//     it('should have a title', () => {
//         navigator.get();
//         let result = 'SMSC Admin';
//         expect(navigator.getTitle()).toBe(result);
//     });
//
//     it('login', () => {
//         navigator.login.login();
//         expect(navigator.isPresentLogo()).toBeTruthy();
//     });
//
//     it('should have dashboard', () => {
//         navigator.clickOnItemNavDashboard();
//         expect(navigator.isPresentDashboard()).toBeTruthy();
//     });
//
//     it('marked sub and main item navigation like active', () => {
//         navigator.hasClass(navigator.dashboardItem, 'active').then((data) => {
//             expect(data).toBeTruthy();
//         });
//     });
//
//     it('should have navigation directive', () => {
//         expect(navigator.isPresentNavDirective()).toBeTruthy();
//     });
//
//     it('should have customers', () => {
//         navigator.clickOnItemNavCustomers();
//         expect(navigator.isPresentCustomers()).toBeTruthy();
//     });
//
//     it('responsive navigation', () => {
//         let width = 900,
//             height = 1300;
//         ptor.manage().window().setSize(width, height);
//         navigator.sidebarDirective.getCssValue('width')
//             .then(value => {
//                 expect(value).toEqual('auto');
//             });
//     });
//
//     // it('AngularJS Translations', () => {
//     //     let lang = navigator.getLanguage();
//     //
//     //     WaitUntil.waitUntil(navigator.dashboardTitle, ptor);
//     //     navigator.getDashboardText()
//     //         .then((text) => {
//     //             expect(lang).toEqual(text);
//     //         });
//     // });
// });
