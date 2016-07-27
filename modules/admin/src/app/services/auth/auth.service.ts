import { AuthHttp } from "angular2-jwt";
import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
    constructor(public authHttp:AuthHttp,
                public tokenService:TokenService) {

    }

    login(username, password) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return new Promise((resolve, reject) => {
            this.authHttp.post(
                '/orientdb/token/smsc', 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&grant_type=password',
                { headers: headers })
                .subscribe(
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
