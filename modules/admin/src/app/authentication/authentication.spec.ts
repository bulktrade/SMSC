import {Authentication} from './authentication.component';
import {AuthenticationModel} from './authentication.model';

describe('Authentication', () => {
    beforeEach(() => {
        this.authentication = new Authentication();
        this.model = new AuthenticationModel('admin', 'admin', false);
    });

    it('authentication method', () => {
        spyOn(this.authentication, 'onSubmit');
        this.authentication.onSubmit(this.model);
        expect(this.authentication.onSubmit).toHaveBeenCalled();

        this.authentication.onSubmit(this.model);
        expect(this.authentication.onSubmit).toHaveBeenCalledWith(this.model);
    });
});
