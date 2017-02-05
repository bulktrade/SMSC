'use strict';

import {Injectable} from "@angular/core";
import {ConfigService} from "../config/config.service";
import {User} from "../common/model/user";
import * as Rx from "rxjs/Rx";
import {RequestOptions, RequestMethod, Http} from "@angular/http";

export const REPOSITORY_NAME: string = 'users';

@Injectable()
export class ProfileService {
    private apiUrl: string;

    constructor(public configService: ConfigService,
                public http: Http) {

        this.apiUrl = configService.config.apiUrl;
    }

    public getProfile(): Rx.Observable<User> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return this.http.request(this.apiUrl + '/profile', requestOptions)
            .map(res => res.json())
            .share();
    }
}
