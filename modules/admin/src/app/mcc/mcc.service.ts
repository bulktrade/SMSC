import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {MCC} from "./mcc.model";
import {ConfigService} from "../config/config.service";
import {CrudRepository} from "../shared/crud-repository";

export const REPOSITORY_NAME: string = 'mcc';

@Injectable()
export class MCCService extends CrudRepository<MCC> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'mcc';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }
}
