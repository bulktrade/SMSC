import { Injectable } from "@angular/core";
import { Http, RequestMethod, RequestOptions, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class BackendService {
    private databaseUrl: string;
    private urlPrefix: string;
    private urlSuffix: string;

    constructor(private http: Http) {
        this.databaseUrl = 'rest';
        this.urlSuffix = '/';
        this.urlPrefix = this.databaseUrl + this.urlSuffix;
    }

    /**
     * Receive new Access and Refresh tokens using valid credentials
     * @param username
     * @param password
     * @returns {any}
     */
    authentication(username: string = '', password: string = '') {
        let requestOptions = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: RequestMethod.Post,
            body: {
                username: username,
                password: password
            }
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'auth/token', requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }
}
