import { JwtHelper } from "angular2-jwt";
import { Injectable } from "@angular/core";

export const AUTH_TOKEN_NAME:string = 'OAccessAdminToken';

@Injectable()
export class TokenService {
    constructor() {

    }

    jwtHelper:JwtHelper = new JwtHelper();

    /**
     * Get token from local storage.
     *
     * @returns {any}
     */
    getToken():string {
        return localStorage.getItem(AUTH_TOKEN_NAME);
    }

    /**
     * Set token to local storage.
     *
     * @param token
     */
    setToken(token:string):void {
        localStorage.setItem(AUTH_TOKEN_NAME, token);
    }

    /**
     * Reset token.
     */
    resetToken():void {
        localStorage.removeItem(AUTH_TOKEN_NAME);
    }

    /**
     * Identify if the token has expired.
     *
     * @returns {boolean}
     */
    isTokenExpired():boolean {
        if (!this.getToken()) {
            return true;
        }

        return this.jwtHelper.isTokenExpired(this.getToken())
    }
}
