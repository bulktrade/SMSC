import {Injectable} from "@angular/core";
import {Http, RequestOptions, RequestMethod, Response} from "@angular/http";
import {ConfigService} from "../config/config.service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import {Customer} from "./model/customer";
import {CrudRepository} from "../shared/crud-repository";
import {User} from "./user.model";
import * as Rx from "rxjs/Rx";

export const REPOSITORY_NAME: string = 'users';
export const PROJECTION_NAME: string = 'withRoles';

@Injectable()
export class UserService extends CrudRepository<User> {
    public repositoryName = REPOSITORY_NAME;
    public projectionName = PROJECTION_NAME;
    public titleColumns = 'username';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }

    public getLoggedUser(): Rx.Observable<User> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return this.http.request(this.apiUrl + '/repository/' + this.repositoryName + '/search/me', requestOptions)
            .map((response: Response) => <User>response.json())
            .share();
    }
}
