import {Authentication} from './authentication.component';

describe('Authentication', () => {
    beforeEach(() => {
        this.authentication = new Authentication();
    });

    it('authentication method', () => {
        spyOn(this.authentication, 'authentication');
        this.authentication.authentication('admin', 'admin');
        expect(this.authentication.authentication).toHaveBeenCalled();

        this.authentication.authentication('admin', 'admin');
        expect(this.authentication.authentication).toHaveBeenCalledWith('admin', 'admin');
    });
});
