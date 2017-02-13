import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigService} from "../../config/config.service";
import {Contact} from "../model/contact";
import {CrudRepository} from "../../shared/crud-repository";

const REPOSITORY_NAME: string = 'customer-contacts';

@Injectable()
export class CustomersContactsService extends CrudRepository<Contact> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'emailAddress';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }
}
