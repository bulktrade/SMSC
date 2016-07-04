import {Login} from './login.component';
import {LoginModel} from './login.model';

describe('Authentication', () => {
    beforeEach(() => {
        this.login = new Login();
        this.model = new LoginModel('admin', 'admin', false);
    });

    it('authentication method', () => {
        spyOn(this.login, 'onSubmit');
        this.login.onSubmit(this.model);
        expect(this.login.onSubmit).toHaveBeenCalled();

        this.login.onSubmit(this.model);
        expect(this.login.onSubmit).toHaveBeenCalledWith(this.model);
    });
});
