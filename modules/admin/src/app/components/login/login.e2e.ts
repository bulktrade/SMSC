describe('Login page', () => {

    beforeEach(() => {
        this.lognpg = new LoginPage();
    });

    it('show navigation content', () => {
        this.lognpg.getNavigation();
        expect(this.lognpg.isPresentMainContent()).toBeFalsy();
    });

    it('is exist page 404 not found', () => {
        this.lognpg.getNotFound();
        expect(this.lognpg.isPresentNotFound).toBeTruthy();
    });

});

class LoginPage {
    elemMainContent  = element(by.className('user-name'));
    elemNotFound  = element(by.tagName('notfound'));

    getNavigation() {
        browser.get('/navigation');
    }

    getNotFound() {
        browser.get('/testloginpage');
    }

    isPresentMainContent() {
        this.elemMainContent.isPresent();
    }

    isPresentNotFound() {
        this.elemNotFound.isPresent();
    }
}
