import * as Rx from "rxjs/Rx";
import {Http, RequestMethod, RequestOptions, URLSearchParams, Headers, Response} from "@angular/http";
import {ConfigService} from "../config/config.service";

export abstract class CrudRepository<T> {
    public abstract repositoryName: string;
    public abstract projectionName: string;
    public abstract titleColumns: string;
    public loading: boolean = false;
    public apiUrl: string;

    constructor(public http: Http,
                public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
    }

    /**
     * Creates the new resource
     * @returns {Observable<T>}
     * @param entity
     */
    createResource<T extends Entity>(entity: T): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: entity
        });

        this.loading = true;

        return this.intercept(this.http.request(this.apiUrl + '/repository/' + this.repositoryName, requestOptions)
            .map((response: Response) => <T>response.json())
            .share());
    }

    /**
     * Patch the resource by link
     * @returns {Observable<T>}
     * @param entity
     */
    updateResource<T extends Entity>(entity: T): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Patch,
            body: entity
        });

        this.loading = true;

        return this.intercept(this.http.request(entity._links.self.href, requestOptions)
            .map((response: Response) => <T>response.json())
            .share());
    }

    /**
     * Removes the resource with id
     * @returns {Observable<T>}
     * @param entity
     */
    deleteResource<T extends Entity>(entity: T): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        this.loading = true;

        return this.intercept(this.http.request(entity._links.self.href, requestOptions)
            .map((response: Response) => <T>response.json())
            .share());
    }

    /**
     * Retrieves a single resource with the given id
     * @returns {Observable<T>}
     * @param entity
     */
    getResource<T extends Entity>(entity: T): Rx.Observable<T> {
        let search = new URLSearchParams();
        search.set('projection', this.projectionName);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(entity._links.self.href, requestOptions)
            .map((response: Response) => <T>response.json())
            .share();
    }

    /**
     * Retrieves a list of all resources with pagination
     * @param page
     * @param size
     * @returns {Observable<T[]>}
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
            .map((response: Response) => <T[]>response.json())
            .share();
    }

    intercept<T extends Entity>(observable: Rx.Observable<T>): Rx.Observable<T> {
        return Rx.Observable.create(obs => {
            observable.subscribe(res => {
                this.loading = false;
                obs.next(res);
            }, err => {
                this.loading = false;
                obs.error(err);
            });
        });
    }
}
