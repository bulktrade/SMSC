import {Login} from './login.component';

describe('Login', () => {
  beforeEach(() => {
    this.login = new Login();
  });

  it('authentication method', () => {
    spyOn(this.login, 'authentication');
    this.login.authentication('admin', 'admin');
    expect(this.login.authentication).toHaveBeenCalled();

    this.login.authentication('admin', 'admin');
    expect(this.login.authentication).toHaveBeenCalledWith('admin', 'admin');
  });
});
