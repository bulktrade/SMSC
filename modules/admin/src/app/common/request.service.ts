'use strict';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

export interface RequestGetOptions {
    url: string;
    headers?: Object;
    body?: Object;
    method?: string|RequestMethod;
}
export interface RequestGetResponse {
    string;
}
export class HTTPRequest {

    constructor(public http: Http) {
    }

    any(options: RequestGetOptions): Promise<RequestGetResponse> {
        let body = JSON.stringify(options.body);
        let headers = new Headers(options.headers);
        let requestOptions = new RequestOptions({ headers: headers, method: options.method, body: body });

        return new Promise((resolve, reject) => {
            this.http.request(options.url, requestOptions)
                .toPromise()
                .then(
                    res => {
                        resolve(res);
                    }).catch(error => {
                         reject(error);
                    });
                })
    }

}
