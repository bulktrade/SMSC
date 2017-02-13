import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigService} from "../../config/config.service";
import {CustomerUser} from "../model/customer-user";
import {CrudRepository} from "../../shared/crud-repository";

const USERS_REPOSITORY_NAME: string = 'customer-users';
const USERS_PROJECTION_NAME: string = 'withCustomer';

@Injectable()
export class CustomersUsersService extends CrudRepository<CustomerUser> {
    public repositoryName = USERS_REPOSITORY_NAME;
    public projectionName = USERS_PROJECTION_NAME;
    public titleColumns = 'email';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }

}
