import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ConfigService } from "../../config/config.service";
import { Contact } from "../model/contact";
import { CrudRepository } from "../../common/crud-repository";

const CONTACTS_REPOSITORY_NAME: string = 'customer-contacts';
const CONTACTS_PROJECTION_NAME: string = 'withCustomer';

@Injectable()
export class CustomersContactsService extends CrudRepository<Contact> {
    public repositoryName = CONTACTS_REPOSITORY_NAME;
    public projectionName = CONTACTS_PROJECTION_NAME;
    public titleColumns = 'emailAddress';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }
}
