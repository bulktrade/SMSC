import { inject, TestBed } from '@angular/core/testing';
import {
    HttpModule,
    ResponseOptions,
    Response
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CRUD_PROVIDERS } from '../../crud/common/crud-providers';
import { AuthService } from './auth.service';
import { LoginModel } from '../../login/login.model';
import { APP_PROVIDERS } from '../../app.module';
import { HTTP_PROVIDERS } from '../../common/mock/http-providers';

describe('Auth service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                ...HTTP_PROVIDERS,
                AuthService,
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should to login', inject([MockBackend, AuthService],
        (backend: MockBackend, service: AuthService) => {
            let path = '/orientdb/token/smsc';
            let model = new LoginModel('admin', 'admin', false);

            backend.connections.subscribe(c => {
                expect(c.request.url).toEqual(path);
                let response = new ResponseOptions({ body: '{"properties": "success"}' });
                c.mockRespond(new Response(response));
            });

            service.login(model.username, model.password)
                .subscribe((res) => {
                    expect(res).toBeDefined();
                });
        }));

    it('should get an error message', inject([MockBackend, AuthService],
        (backend: MockBackend, service: AuthService) => {
            let path = '/orientdb/token/smsc';
            let model = new LoginModel('test', '12t', false);
            let error: Error = {
                name: 'Error',
                message: 'Bad request'
            };

            backend.connections.subscribe(c => {
                expect(c.request.url).toEqual(path);
                c.mockError(error);
            });

            service.login(model.username, model.password)
                .subscribe((res) => {
                }, err => {
                    expect(err).toBeDefined();
                });
        }));

});

