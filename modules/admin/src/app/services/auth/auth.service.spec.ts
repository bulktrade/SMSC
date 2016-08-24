import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, BaseRequestOptions, Http, ConnectionBackend, ResponseOptions, Response } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { APP_PROVIDERS } from "../../index";
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { ODatabaseService } from "../../orientdb/orientdb.service";
import { AuthService } from "./auth.service";
import { LoginModel } from "../../login/login.model";

describe('ODatabaseService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                AuthService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http, useFactory: (backend:ConnectionBackend,
                                                defaultOptions:BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps: [ MockBackend, BaseRequestOptions ]
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined response of the open', inject([ MockBackend, AuthService ], (backend:MockBackend, service:AuthService) => {
        let path = '/orientdb/token/smsc';
        let model = new LoginModel('test', '12t', false);

        backend.connections.subscribe(c => {
            expect(c.request.url).toEqual(path);
            let response = new ResponseOptions({ body: '{"properties": "success"}' });
            c.mockRespond(new Response(response));
        });

        service.login(model.username, model.password)
            .then((res) => {
                expect(res).toBeDefined();
            }, (error) => {
                expect(error).toBeDefined();
            });
    }));

});

