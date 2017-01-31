// import { LoginPage } from './login.page';
// import { LoginModel } from './login.model';
// import { browser, protractor } from 'protractor';
//
// describe('LoginComponent page', () => {
//     let ptor = protractor.wrapDriver(browser.driver);
//     let loginPage = new LoginPage();
//
//     beforeEach(() => {
//         ptor = protractor.wrapDriver(browser.driver);
//     });
//
//     it('should display login window', () => {
//         loginPage.get();
//         expect(loginPage.isPresentLoginWindow()).toBeTruthy();
//     });
//
//     it('should display alert danger', () => {
//         let incorrectData: LoginModel = new LoginModel('root', '123t', false);
//         loginPage.fillLoginForm(incorrectData);
//         expect(loginPage.isPresentErrorAlert()).toBeTruthy();
//     });
//
//     it('is exist page 404 not found', () => {
//         loginPage.getNotFound();
//         expect(loginPage.isPresentNotFound).toBeTruthy();
//     });
//
// });
