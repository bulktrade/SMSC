import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, RequestMethod, URLSearchParams } from "@angular/http";
import { ConfigService } from "../../config/config.service";
import { Observable } from "rxjs";
import { CustomerUser } from "../model/customer-user";
import { CrudRepository } from "../../common/interfaces/crud-repository";

const USERS_REPOSITORY_NAME: string = 'customer-users';
const USERS_PROJECTION_NAME: string = 'withCustomer';

@Injectable()
export class CustomersUsersService implements CrudRepository<CustomerUser> {
    public repositoryName = USERS_REPOSITORY_NAME;
    public projectionName = USERS_PROJECTION_NAME;
    public titleColumns = 'email';
    private apiUrl: string;

    constructor(public http: Http,
                public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
    }

    /**
     * Delete user
     * @param userId
     * @returns {Observable<T>}
     */
    deleteResource(userId: number): Observable<CustomerUser> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Delete,
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName + '/' + userId, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Create user
     * @param data
     * @returns {Observable<T>}
     */
    createResource(data: CustomerUser): Observable<CustomerUser> {
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
     * Replaces the user identified by id
     * @param id
     * @param data
     * @returns {Observable<T>}
     */
    updateResource(id: number, data: CustomerUser): Observable<CustomerUser> {
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
     * Retrieves a single user with the given id
     * @param id
     * @returns {Observable<T>}
     */
    getResource(id: number): Observable<CustomerUser> {
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
     * Retrieves a list of all customer users with pagination
     * @param page
     * @param size
     * @returns {Observable<T>}
     */
    getResources(page?: number, size?: number): Observable<CustomerUser[]> {
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
