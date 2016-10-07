import { LoginPage } from '../login/login.page';
import { EC } from '../common/expectedConditions';

export class NavigationPage {
    public login: LoginPage = new LoginPage();

    public dashboardItem = element(by.className('dashboards'));
    public customerdItem = element(by.className('customers'));
    public sidebarDirective = element(by.tagName('sidebar'));
    public logo = element(by.id('logo'));

    public dashboard = element(by.tagName('dashboard'));
    public customers = element(by.tagName('customers'));


    constructor() {
    }

    get() {
        browser.get(browser.baseUrl + '/');
    }

    getTitle() {
        return browser.getTitle();
    }

    hasClass(element, cls) {
        return element.getAttribute('class').then((classes) => {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    clickOnItemNavDashboard() {
        browser.wait(EC.elementToBeClickable(this.dashboardItem), 5000);
        this.dashboardItem.click();
    }

    isPresentDashboard() {
        browser.wait(EC.presenceOf(this.dashboard), 5000);
        return this.dashboard.isPresent();
    }

    isPresentNavDirective() {
        return this.sidebarDirective.isPresent();
    }

    clickOnItemNavCustomers() {
        browser.wait(EC.presenceOf(this.customerdItem), 5000);
        this.customerdItem.click();
    }

    isPresentCustomers() {
        browser.wait(EC.presenceOf(this.customers), 5000);
        return this.customers.isPresent();
    }

    isPresentLogo() {
        browser.wait(EC.presenceOf(this.logo), 5000);
        return this.logo.isPresent();
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

}
