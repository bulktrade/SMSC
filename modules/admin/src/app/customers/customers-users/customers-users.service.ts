import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, RequestMethod, URLSearchParams } from "@angular/http";
import { ConfigService } from "../../config/config.service";
import { Observable } from "rxjs";
import { CustomerUser } from "../model/customer-user";
import { Customer } from "../model/customer";

const USERS_REPOSITORY_NAME: string = 'users';
const USERS_PROJECTION_NAME: string = 'withCustomer';

@Injectable()
export class CustomersUsersService {
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
    deleteUser(userId: number): Observable<CustomerUser> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Delete,
        });

        return this.http.request(this.apiUrl + '/repository/' + USERS_REPOSITORY_NAME + '/' + userId, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Create user
     * @param data
     * @returns {Observable<T>}
     */
    createUser(data: CustomerUser): Observable<CustomerUser> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + USERS_REPOSITORY_NAME, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Replaces the user identified by id
     * @param id
     * @param data
     * @returns {Observable<T>}
     */
    updateUser(id: number, data: CustomerUser): Observable<CustomerUser> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + USERS_REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Retrieves a single user with the given id
     * @param id
     * @returns {Observable<T>}
     */
    getUser(id: number): Observable<Customer> {
        let search = new URLSearchParams();
        search.set('projection', USERS_PROJECTION_NAME);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + USERS_REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }

}
