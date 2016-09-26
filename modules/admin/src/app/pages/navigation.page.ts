import { LoginPage } from './login.page';

export class NavigationTest {
    public login: LoginPage = new LoginPage();

    public dashboardTitle = element(by.className('dashboard-item'));
    public dashboardItem = element(by.className('dashboard'));
    public sidebarDirective = element(by.tagName('sidebar'));

    public dashboard = element(by.css('dashboard .wrap-breadcrumb'));
    public customers = element(by.css('customers .wrap-breadcrumb'));


    constructor() {
    }

    get() {
        browser.get('/admin');
    }

    getTitle() {
        return browser.getTitle();
    }

    getLanguage() {
        let result,
            userLang = 'en';

        switch (userLang) {
            case 'en':
                result = 'Dashboard';
                break;
            case 'ru':
                result = 'Приборная панель';
                break;
            case 'de':
                result = 'Armaturenbrett';
                break;
            default:
                result = 'Dashboard';
                break;
        }

        return result;
    }

    getDashboardText() {
        return this.dashboardTitle.getText();
    }

    hasClass(element, cls) {
        return element.getAttribute('class').then((classes) => {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    clickOnItemNavDashboard(ptor) {
    return new Promise((resolve, reject) => {
        ptor.wait(protractor.until.elementLocated(by.className('dashboard')), 5000)
            .then(function (el: webdriver.IWebElement) {
                resolve(el.click());
            }).thenCatch((errback) => {
            reject(errback);
        });
    });
}

    getDashboard() {
        return this.dashboard.isPresent();
    }

    isPresentNavDirective() {
        return this.sidebarDirective.isPresent();
    }

    clickOnItemNavCustomers(ptor) {
        return new Promise((resolve, reject) => {
            ptor.wait(protractor.until.elementLocated(by.className('customers')), 5000)
                .then(function (el: webdriver.IWebElement) {
                    resolve(el.click());
                }).thenCatch((errback) => {
                reject(errback);
            });
        });
    }

    getCustomers() {
        return this.customers.isPresent();
    }

}
