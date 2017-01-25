import { Injectable } from "@angular/core";
import { Http, RequestMethod, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { RequestOptions } from "@angular/http/src/base_request_options";
import { ConfigService } from "../../config/config.service";

@Injectable()
export class BackendService {
    private apiUrl: string;
    private urlPrefix: string;
    private urlSuffix: string;

    constructor(public http: Http, public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
        this.urlSuffix = '/';
        this.urlPrefix = this.apiUrl + this.urlSuffix;
    }

    /**
     * Receive new Access and Refresh tokens using valid credentials
     * @param username
     * @param password
     * @returns {any}
     */
    authentication(username: string = '', password: string = '') {
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

    /**
     * Receives refreshed Access token using valid Refresh token
     * @param expiredToken
     * @param refreshToken
     * @returns {any}
     */
    refreshAccessToken(expiredToken: string = '', refreshToken: string = '') {
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

    /**
     * Gets data by link from repository
     * @param link
     * @returns {any}
     */
    getDataByLink(link: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(obs => {
            this.http.request(link, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json()._embedded);
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }


    /**
     * Creates the new resource to the specified repository
     * @param data
     * @param repositoryName
     * @returns {any}
     */
    createResource(data, repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: data
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Replaces the resource identified by id in the specified repository
     * @param id
     * @param data
     * @param repositoryName
     * @returns {any}
     */
    updateResource(id: string = '', data, repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: data
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName +
                this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Removes the resource with id from the specified repository
     * @param id
     * @param repositoryName
     * @returns {any}
     */
    deleteResource(id: string = '', repositoryName: string = '') {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName
                + this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Retrieves a single resource with the given id from the specified repository
     * @param id
     * @param repositoryName
     * @returns {any}
     */
    getResource(id: string = '', repositoryName: string = '') {
        let search = new URLSearchParams();
        search.set('projection', repositoryName);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName +
                this.urlSuffix + id, requestOptions)
                .subscribe((res: Response) => {
                    obs.next(res.json());
                    obs.complete();
                }, err => {
                    obs.error(err);
                    obs.complete();
                });
        });
    }

    /**
     * Retrieves a list of all resources from the specified repository
     * @param repositoryName
     * @param page
     * @param size
     * @returns {any}
     */
    getResources(repositoryName: string = '', page?: number, size?: number) {
        let search = new URLSearchParams();

        if (typeof page !== 'undefined' && typeof size !== 'undefined') {
            search.set('page', page + '');
            search.set('size', size + '');
        }

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return Observable.create(obs => {
            this.http.request(this.urlPrefix + 'repository' + this.urlSuffix + repositoryName, requestOptions)
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
