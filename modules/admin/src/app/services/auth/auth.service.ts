import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";
import { RequestOptions, Headers, RequestMethod, Http } from "@angular/http";
import { ConfigService } from "../../config/config.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import * as Rx from "rxjs/Rx";
import { AuthModel } from "./auth.model";

@Injectable()
export class AuthService {
    private apiUrl: string;

    constructor(public tokenService: TokenService,
                public configService: ConfigService,
                public http: Http) {
        this.apiUrl = configService.config.apiUrl;
    }

    login(username, password) {
        return Observable.create((observer) => {
            this.authentication(username, password)
                .map(data => data['token'])
                .subscribe(
                    token => {
                        this.tokenService.setToken(token);
                        observer.next(this.tokenService.getToken());
                    },
                    err => {
                        observer.error(err);
                    }
                );
        });
    }

    /**
     * Receive new Access and Refresh tokens using valid credentials
     * @param username
     * @param password
     * @returns {Observable<T>}
     */
    authentication(username: string = '', password: string = ''): Rx.Observable<AuthModel> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: {
                username: username,
                password: password
            }
        });

        return this.http.request(this.apiUrl + '/auth/token', requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Receives refreshed Access token using valid Refresh token
     * @param expiredToken
     * @param refreshToken
     * @returns {Observable<T>}
     */
    refreshAccessToken(expiredToken: string = '', refreshToken: string = ''): Rx.Observable<string> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: {
                expiredToken: expiredToken,
                refreshToken: refreshToken
            }
        });

        return this.http.request(this.apiUrl + '/auth/token', requestOptions)
            .map(res => res.json())
            .share();
    }
}
