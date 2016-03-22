import {Login} from './login';
describe('Login', () => {
  let login;

  beforeEach(() => {
    login = new Login();
  });

  it('authentication method', () => {
    spyOn(login, 'authentication');
    login.authentication('admin', 'admin');
    expect(login.authentication).toHaveBeenCalled();

    login.authentication('admin', 'admin');
    expect(login.authentication).toHaveBeenCalledWith('admin', 'admin');
  });

  it('sha256', () => {
    spyOn(login, 'sha256');
    login.sha256('admin');
    expect(login.sha256).toHaveBeenCalled();

    login.sha256('admin');
    expect(login.sha256).toHaveBeenCalledWith('admin');
  });
});