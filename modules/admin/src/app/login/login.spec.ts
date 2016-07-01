import {Login} from "./login.component";
import {LoginModel} from "./login.model";

describe('Authentication', () => {
    beforeEach(() => {
        this.authentication = new Login();
        this.model = new LoginModel('admin', 'admin', false);
    });

    it('authentication method', () => {
        spyOn(this.authentication, 'onSubmit');
        this.authentication.onSubmit(this.model);
        expect(this.authentication.onSubmit).toHaveBeenCalled();

        this.authentication.onSubmit(this.model);
        expect(this.authentication.onSubmit).toHaveBeenCalledWith(this.model);
    });
});
