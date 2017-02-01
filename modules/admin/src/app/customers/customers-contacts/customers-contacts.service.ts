import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, RequestMethod } from "@angular/http";
import { ConfigService } from "../../config/config.service";
import { Observable } from "rxjs";
import { Contact } from "../model/contact";

const CONTACTS_REPOSITORY_NAME: string = 'customer-contacts';

@Injectable()
export class CustomersContactsService {
    private apiUrl: string;

    constructor(public http: Http,
                public configService: ConfigService) {
        this.apiUrl = configService.config.apiUrl;
    }

    /**
     * Delete customerContact
     * @param contactId
     * @returns {Observable<T>}
     */
    deleteCustomerContacts(contactId: string): Observable<Contact> {
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
     * Create customerContact
     * @param data
     * @returns {Observable<T>}
     */
    createContact(data): Observable<Contact> {
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

}
