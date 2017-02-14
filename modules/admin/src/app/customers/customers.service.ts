import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigService} from "../config/config.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import {Customer} from "./model/customer";
import {CrudRepository} from "../shared/crud-repository";

export const REPOSITORY_NAME: string = 'customers';

@Injectable()
export class CustomersService extends CrudRepository<Customer> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'country';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }
}
