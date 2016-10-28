import { inject, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CRUD_PROVIDERS } from '../crud/common/crud-providers';
import { AuthService } from '../services/auth/auth.service';
import { LoginModel } from './login.model';
import { HttpModule, ResponseOptions, Response } from '@angular/http';
import { HTTP_PROVIDERS } from '../common/mock/http-providers';
import { MockBackend } from '@angular/http/testing';
import { TokenService } from '../services/auth/token.service';

class MockTokenService {
    setToken(token: string) {
    };

    getToken() {
    };
}

describe('Authentication', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...HTTP_PROVIDERS,
                { provide: TokenService, useClass: MockTokenService },
                LoginComponent,
                AuthService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be model', inject([LoginComponent], (login) => {
        let model = new LoginModel('', '', false);

        expect(login.model).toEqual(model);
    }));

    it('loading should be is false', inject([LoginComponent], (login) => {
        expect(login.loading).toBeFalsy();
    }));

    it('should to login', inject([LoginComponent, MockBackend],
        (login: LoginComponent, backend: MockBackend) => {
            let model = new LoginModel('admin', 'admin', false);
            let path = '/orientdb/token/smsc';
            let responseBody = {
                'json': () => {
                    return {
                        '@type': 'd',
                        '@version': '0',
                        'access_token': 'eyJAdHlwZSI6ImQ=',
                        'expires_in': '3600'
                    };
                }
            };

            backend.connections.subscribe(c => {
                expect(c.request.url).toEqual(path);
                let response = new ResponseOptions({ body: JSON.stringify(responseBody) });
                c.mockRespond(new Response(response));
            });

            login.onSubmit(model)
                .then(res => {
                    expect(login.isErrorMessage).toBeFalsy();
                });
        }));

    it('should get an error message with text user not found', inject([LoginComponent, MockBackend],
        (login: LoginComponent, backend: MockBackend) => {
            let model = new LoginModel('admin', 'admin', false);
            let path = '/orientdb/token/smsc';

            backend.connections.subscribe(c => {
                expect(c.request.url).toEqual(path);
                c.mockError(new Response(new ResponseOptions({
                    body: {},
                    status: 400
                })));
            });

            login.onSubmit(model)
                .then(res => {
                })
                .catch((error) => {
                    expect(login.isErrorMessage).toBeTruthy();
                    expect(login.errorMessage).toEqual('login.userNotFound');
                });
        }));

    it('should to get the common error message', inject([LoginComponent, MockBackend],
        (login: LoginComponent, backend: MockBackend) => {
            let model = new LoginModel('admin', 'admin', false);
            let path = '/orientdb/token/smsc';

            backend.connections.subscribe(c => {
                expect(c.request.url).toEqual(path);
                c.mockError(new Response(new ResponseOptions({
                    body: {},
                    status: 502
                })));
            });

            login.onSubmit(model)
                .then(res => {
                })
                .catch((error) => {
                    expect(login.isErrorMessage).toBeTruthy();
                    expect(login.errorMessage).toEqual('login.commonError');
                });
        }));
});
