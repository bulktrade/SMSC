import {ODatabaseService} from "../../orientdb/orientdb.service";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {provide} from "@angular/core";
import {
    TranslateService, TranslateLoader, TranslateStaticLoader,
    TRANSLATE_PROVIDERS
} from 'ng2-translate/ng2-translate';
import {ActivatedRoute, Router} from "@angular/router";
import {CrudService} from "../crud.service";
import {AuthHttp, AuthConfig} from "angular2-jwt/angular2-jwt";
import {TokenService, AUTH_TOKEN_NAME} from "../../services/auth/token.service";
import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";

class MockActivatedRoute {};

export const crudProviders = [
    provide(ODatabaseService, {
        useFactory: (authHttp) => new ODatabaseService('/orientdb/smsc', authHttp),
        deps: [AuthHttp]
    }),
    provide(AuthHttp, {
        useFactory: (http, tokenService) => {
            return new AuthHttp(new AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: AUTH_TOKEN_NAME,
                tokenGetter: tokenService.getToken,
                globalHeaders: [{ 'Content-Type': 'application/json' }],
                noJwtError: true,
                noTokenScheme: true
            }), http);
        },
        deps: [Http, TokenService]
    }),
    {provide: ActivatedRoute, useClass: MockActivatedRoute},
    {provide: Router, useClass: MockActivatedRoute},
    CrudService,
    HTTP_PROVIDERS,
    TokenService,
    TranslateService,
    LocalStorageService,
    TRANSLATE_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
        deps: [Http]
    }),
];
