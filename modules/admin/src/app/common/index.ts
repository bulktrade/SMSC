import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { provide } from "@angular/core";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { Router } from "@angular/router";
import {AUTH_TOKEN_NAME, TokenService} from "../services/auth/token.service";
import {ODatabaseService} from "../orientdb/orientdb.service";
import {HttpInterceptor} from "./httpInterceptor";

export const COMMON_PROVIDERS = [
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    }),
    provide(AuthHttp, {
        useFactory: (http, tokenService) => {
            return new AuthHttp(new AuthConfig({
                headerName: 'Authorization',
                headerPrefix: 'Bearer',
                tokenName: AUTH_TOKEN_NAME,
                tokenGetter: tokenService.getToken,
                noJwtError: true,
                noTokenScheme: true
            }), http);
        },
        deps: [Http, TokenService]
    }),
    provide(ODatabaseService, {
        useFactory: (authHttp) => new ODatabaseService('/orientdb/smsc', authHttp),
        deps: [AuthHttp]
    })
];
