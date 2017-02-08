import * as Rx from "rxjs/Rx";
import { Http, RequestMethod, RequestOptions, URLSearchParams, Headers } from "@angular/http";
import { ConfigService } from "../config/config.service";

export abstract class CrudRepository<T> {
    public abstract repositoryName: string;
    public abstract projectionName: string;
    public abstract titleColumns: string;
    public apiUrl: string;

    constructor(public http: Http,
                public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
    }

    /**
     * Creates the new resource
     * @param data
     * @returns {Observable<T>}
     */
    createResource(data: T): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Replaces the resource by id
     * @param id
     * @param data
     * @returns {Observable<T>}
     */
    updateResource(id: number, data: T): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Removes the resource with id
     * @param id
     * @returns {Observable<T>}
     */
    deleteResource(id: number): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Retrieves a single resource with the given id
     * @param id
     * @returns {Observable<T>}
     */
    getResource(id: number): Rx.Observable<T> {
        let search = new URLSearchParams();
        search.set('projection', this.projectionName);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Retrieves a list of all resources with pagination
     * @param page
     * @param size
     * @returns {Observable<T>}
     */
    getResources(page?: number, size?: number): Rx.Observable<T[]> {
        let search = new URLSearchParams();

        if (typeof page !== 'undefined' && typeof size !== 'undefined') {
            search.set('page', page + '');
            search.set('size', size + '');
        }

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName, requestOptions)
            .map(res => res.json())
            .share();
    }
}
