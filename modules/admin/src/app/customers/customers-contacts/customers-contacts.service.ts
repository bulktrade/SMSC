import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, RequestMethod, URLSearchParams } from "@angular/http";
import { ConfigService } from "../../config/config.service";
import { Observable } from "rxjs";
import { Contact } from "../model/contact";
import { Customer } from "../model/customer";

const CONTACTS_REPOSITORY_NAME: string = 'customer-contacts';
const CONTACTS_PROJECTION_NAME: string = 'withCustomer';

@Injectable()
export class CustomersContactsService {
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
    deleteContact(contactId: number): Observable<Contact> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Delete,
        });

        return this.http.request(this.apiUrl + '/repository/' + CONTACTS_REPOSITORY_NAME + '/' + contactId, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Create contact
     * @param data
     * @returns {Observable<T>}
     */
    createContact(data: Contact): Observable<Contact> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Post,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + CONTACTS_REPOSITORY_NAME, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Replaces the contact identified by id
     * @param id
     * @param data
     * @returns {Observable<T>}
     */
    updateContact(id: number, data: Contact): Observable<Contact> {
        let requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: RequestMethod.Put,
            body: data
        });

        return this.http.request(this.apiUrl + '/repository/' + CONTACTS_REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }

    /**
     * Retrieves a single contact with the given id
     * @param id
     * @returns {Observable<T>}
     */
    getContact(id: number): Observable<Customer> {
        let search = new URLSearchParams();
        search.set('projection', CONTACTS_PROJECTION_NAME);

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' + CONTACTS_REPOSITORY_NAME + '/' + id, requestOptions)
            .map(res => res.json())
            .share();
    }

}
