import { inject, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { AuthService } from "../services/auth/auth.service";
import { LoginModel } from "./login.model";
import { HttpModule } from "@angular/http";
import { HTTP_PROVIDERS } from "../common/components/mock/http-providers";
import { TokenService } from "../services/auth/token.service";
import { ConfigService } from "../config/config.service";
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationService } from "../services/notification-service";
import { TranslateModule } from "ng2-translate";

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
                NotificationService,
                ...HTTP_PROVIDERS,
                { provide: TokenService, useClass: MockTokenService },
                ConfigService,
                LoginComponent,
                AuthService
            ],
            imports: [
                HttpModule,
                RouterTestingModule,
                TranslateModule.forRoot()
            ]
        });
    });

    // it('should be model', inject([LoginComponent], (login) => {
    //     let model = new LoginModel('', '', false);
    //
    //     expect(login.model).toEqual(model);
    // }));
    //
    // it('loading should be is false', inject([LoginComponent], (login) => {
    //     expect(login.loading).toBeFalsy();
    // }));

    // it('should to login', inject([LoginComponent, MockBackend],
    //     (login: LoginComponent, backend: MockBackend) => {
    //         let model = new LoginModel('admin', 'admin', false);
    //         let path = '/orientdb/token/smsc';
    //         let responseBody = {
    //             'json': () => {
    //                 return {
    //                     '@type': 'd',
    //                     '@version': '0',
    //                     'access_token': 'eyJAdHlwZSI6ImQ=',
    //                     'expires_in': '3600'
    //                 };
    //             }
    //         };
    //
    //         backend.connections.subscribe(c => {
    //             expect(c.request.url).toEqual(path);
    //             let response = new ResponseOptions({ body: JSON.stringify(responseBody) });
    //             c.mockRespond(new Response(response));
    //         });
    //
    //         login.onSubmit(model)
    //             .then(res => {
    //                 expect(login.isErrorMessage).toBeFalsy();
    //             });
    //     }));
    //
    // it('should get an error message with text user not found', inject([LoginComponent, MockBackend],
    //     (login: LoginComponent, backend: MockBackend) => {
    //         let model = new LoginModel('admin', 'admin', false);
    //         let path = '/orientdb/token/smsc';
    //
    //         backend.connections.subscribe(c => {
    //             expect(c.request.url).toEqual(path);
    //             c.mockError(new Response(new ResponseOptions({
    //                 body: {},
    //                 status: 400
    //             })));
    //         });
    //
    //         login.onSubmit(model)
    //             .then(res => {
    //             })
    //             .catch((error) => {
    //                 expect(login.isErrorMessage).toBeTruthy();
    //             });
    //     }));
    //
    // it('should to get the common error message', inject([LoginComponent, MockBackend],
    //     (login: LoginComponent, backend: MockBackend) => {
    //         let model = new LoginModel('admin', 'admin', false);
    //         let path = '/orientdb/token/smsc';
    //
    //         backend.connections.subscribe(c => {
    //             expect(c.request.url).toEqual(path);
    //             c.mockError(new Response(new ResponseOptions({
    //                 body: {},
    //                 status: 502
    //             })));
    //         });
    //
    //         login.onSubmit(model)
    //             .then(res => {
    //             })
    //             .catch((error) => {
    //                 expect(login.isErrorMessage).toBeTruthy();
    //             });
    //     }));
});
