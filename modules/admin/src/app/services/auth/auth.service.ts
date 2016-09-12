import { AuthHttp } from "angular2-jwt";
import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { TokenService } from "./token.service";
import { ConfigService } from "../../config/configService";

@Injectable()
export class AuthService {
    constructor(public authHttp: AuthHttp,
                public tokenService: TokenService,
                public configService: ConfigService) {

    }

    login(username, password) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) => {
            this.authHttp.post(
                this.configService.config.orientDBUrl + '/token/' + this.configService.config.orientDBDatabase,
                'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&grant_type=password',
                { headers: headers }
            ).subscribe(
                data => {
                    this.tokenService.setToken(data.json()['access_token']);
                    resolve(this.tokenService.getToken());
                },
                err => {
                    reject(err);
                }
            );
        });
    }
}
