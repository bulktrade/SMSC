import {Injectable} from "@angular/core";
import {Http, RequestMethod, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {CrudRepository} from "../../shared/crud-repository";
import {DashboardBoxType} from "./dashboard-box-type.model";
import {ConfigService} from "../../config/config.service";
import {DashboardBox} from "../dashboard-box/dashboard-box.model";

export const REPOSITORY_NAME: string = 'dashboard-box-types';

@Injectable()
export class DashboardBoxTypeService extends CrudRepository<DashboardBoxType> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'name';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }

    getDashboardBoxType(dashboardBox: DashboardBox): Observable<DashboardBoxType> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return this.http.request(dashboardBox._links.dashboardBoxType.href, requestOptions)
            .map(res => <DashboardBoxType>res.json())
            .share();
    }
}
