import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigService} from "../../config/config.service";
import {CustomerUser} from "../model/customer-user";
import {CrudRepository} from "../../shared/crud-repository";

const REPOSITORY_NAME: string = 'customer-users';

@Injectable()
export class CustomersUsersService extends CrudRepository<CustomerUser> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'email';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }

}
