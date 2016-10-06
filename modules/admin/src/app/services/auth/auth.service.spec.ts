import { inject, TestBed } from '@angular/core/testing';
import {
    HttpModule,
    ResponseOptions,
    Response
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CRUD_PROVIDERS } from '../../crud/common/crudProviders';
import { AuthService } from './auth.service';
import { LoginModel } from '../../login/login.model';
import { APP_PROVIDERS } from '../../app.module';
import { HTTP_PROVIDERS } from "../../common/mock/httpProviders";

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

    it('should be defined response of the open', inject([MockBackend, AuthService],
        (backend: MockBackend, service: AuthService) => {
            let path = '/orientdb/token/smsc';
            let model = new LoginModel('test', '12t', false);

            backend.connections.subscribe(c => {
                expect(c.request.url).toEqual(path);
                let response = new ResponseOptions({ body: '{"properties": "success"}' });
                c.mockRespond(new Response(response));
            });

            service.login(model.username, model.password)
                .subscribe((res) => {
                    expect(res).toBeDefined();
                }, (error) => {
                    expect(error).toBeDefined();
                });
        }));

});

