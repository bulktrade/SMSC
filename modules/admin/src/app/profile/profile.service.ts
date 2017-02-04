'use strict';

import {Injectable} from "@angular/core";
import {ConfigService} from "../config/config.service";
import {User} from "../common/model/user";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class ProfileService {
    private apiUrl: string;

    constructor(public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
    }

    public getProfile(): Rx.Observable<User> {
        let search = new URLSearchParams();
        search.set('projection', PROJECTION_NAME);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }
}
