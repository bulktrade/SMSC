import {Injectable} from "@angular/core";
import {Http, RequestMethod, RequestOptions} from "@angular/http";
import {CrudRepository} from "../../shared/crud-repository";
import {ConfigService} from "../../config/config.service";
import {DashboardBox} from "./dashboard-box.model";
import {Dashboard} from "../dashboard.model";
import {Observable} from "rxjs";

export const REPOSITORY_NAME: string = 'dashboard-boxes';

@Injectable()
export class DashboardBoxService extends CrudRepository<DashboardBox> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'name';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }

    getDashboardBoxes(dashboard: Dashboard): Observable<DashboardBox[]> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return this.http.request(dashboard._links.dashboardBoxes.href, requestOptions)
            .map(res => <DashboardBox[]>res.json()['_embedded'][this.repositoryName])
            .share();
    }
}
