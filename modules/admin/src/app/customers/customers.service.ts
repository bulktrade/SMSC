import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ConfigService } from "../config/config.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import { Customer } from "./model/customer";
import { CrudRepository } from "../shared/crud-repository";
const clone = require("js.clone");

export const REPOSITORY_NAME: string = 'customers';
export const PROJECTION_NAME: string = 'withContactsAndUsers';

@Injectable()
export class CustomersService extends CrudRepository<Customer> {
    public repositoryName = REPOSITORY_NAME;
    public projectionName = PROJECTION_NAME;
    public titleColumns = 'country';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }
}
