import * as Rx from "rxjs/Rx";
import {Http, RequestMethod, RequestOptions, URLSearchParams, Headers, Response} from "@angular/http";
import {ConfigService} from "../config/config.service";
import {Entity, Links, Link} from "./entity.model";
import {Sort} from "./sort.model";

export abstract class CrudRepository<T> {
    public abstract repositoryName: string;
    public abstract titleColumns: string;
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
    createResource<T>(entity: T): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: entity
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName, requestOptions)
            .map((response: Response) => <T>response.json())
            .share();
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

        return this.http.request(entity._links.self.href, requestOptions)
            .map((response: Response) => <T>response.json())
            .share();
    }

    /**
     * Removes the resource with entity
     * @returns {Observable<T>}
     * @param entity
     */
    deleteResource<T extends Entity>(entity: T): Rx.Observable<Response> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });

        return this.http.request(entity._links.self.href, requestOptions)
            .share();
    }

    /**
     * Removes the resource with id
     * @param id
     * @returns {Rx.Observable<T>}
     */
    deleteResourceById(id: number): Rx.Observable<Response> {
        return this.deleteResource(this.getSelfLinkedEntityById(id));
    }

    /**
     * Retrieves a single resource with the given entity
     * @returns {Observable<T>}
     * @param entity
     */
    getResource<T extends Entity>(entity: T): Rx.Observable<T> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return this.http.request(entity._links.self.href, requestOptions)
            .map((response: Response) => <T>response.json())
            .share();
    }

    /**
     * Retrieves a single resource with the given id
     * @param id
     * @returns {Rx.Observable<T>}
     */
    getResourceById<T extends Entity>(id: number): Rx.Observable<T> {
        return this.getResource(this.getSelfLinkedEntityById(id));
    }

    /**
     * Retrieves an instance of the entity with set self link
     * @param id
     * @returns {T}
     */
    getSelfLinkedEntityById<T extends Entity>(id: number): T {
        let entity: Entity = new Entity();
        entity._links = new Links();
        entity._links.self = new Link();
        entity._links.self.href = this.apiUrl + '/repository/' + this.repositoryName + '/' + id;

        return <T>entity;
    }

    /**
     * Retrieves a list of all resources with pagination and filtering
     *
     * @example
     * let pageIndex: number = 0;
     * let pageSize: number = 10;
     * let query = {
     *      property: 'value',
     *      property2: 'value2'
     * };
     * getResources(pageIndex, pageSize, query);
     * @param page
     * @param size
     * @param query
     * @param sort
     * @returns {Observable<T>}
     */
    getResources(page?: number, size?: number, query?: T, sort?: Sort): Rx.Observable<T[]> {
        let search = new URLSearchParams();

        if (typeof page !== 'undefined' && typeof size !== 'undefined') {
            search.set('page', page + '');
            search.set('size', size + '');
        }

        if (sort) {
            search.set('sort', sort.orderBy + ',' + sort.sortType);
        }

        if (query) {
            for (let i in query) {
                if (query.hasOwnProperty(i)) {
                    search.set(i, String(query[i]));
                }
            }
        }

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName, requestOptions)
            .map((response: Response) => <T[]>response.json())
            .share();
    }
}
