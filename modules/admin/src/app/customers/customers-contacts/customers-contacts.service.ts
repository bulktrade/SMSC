import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, RequestMethod, URLSearchParams } from "@angular/http";
import { ConfigService } from "../../config/config.service";
import { Observable } from "rxjs";
import { Contact } from "../model/contact";
import { CrudRepository } from "../../common/interfaces/crud-repository";

const CONTACTS_REPOSITORY_NAME: string = 'customer-contacts';
const CONTACTS_PROJECTION_NAME: string = 'withCustomer';

@Injectable()
export class CustomersContactsService implements CrudRepository<Contact> {
    public repositoryName = CONTACTS_REPOSITORY_NAME;
    public projectionName = CONTACTS_PROJECTION_NAME;
    public titleColumns = 'emailAddress';
    private apiUrl: string;

    constructor(public http: Http,
                public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
    }

    /**
     * Delete contact
     * @param contactId
     * @returns {Observable<T>}
     */
    deleteResource(contactId: number): Observable<Contact> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Delete,
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName + '/' + contactId, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Create contact
     * @param data
     * @returns {Observable<T>}
     */
    createResource(data: Contact): Observable<Contact> {
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
     * Replaces the contact identified by id
     * @param id
     * @param data
     * @returns {Observable<T>}
     */
    updateResource(id: number, data: Contact): Observable<Contact> {
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
     * Retrieves a single contact with the given id
     * @param id
     * @returns {Observable<T>}
     */
    getResource(id: number): Observable<Contact> {
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
     * Retrieves a list of all contacts with pagination
     * @param page
     * @param size
     * @returns {Observable<T>}
     */
    getResources(page?: number, size?: number): Observable<Contact[]> {
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
