import {Injectable} from "@angular/core";
import {Http, RequestMethod, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";

import {Dashboard} from "./dashboard.model";
import {CrudRepository} from "../shared/crud-repository";
import {ConfigService} from "../config/config.service";

export const REPOSITORY_NAME: string = 'dashboards';

@Injectable()
export class DashboardService extends CrudRepository<Dashboard> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'name';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }

    getDefaultDashboard(): Observable<Dashboard> {
        let search = new URLSearchParams();
        search.set('name', 'default');

        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            search: search
        });

        return this.http.request(this.apiUrl + '/repository/' +
            this.repositoryName + '/search/findByName', requestOptions)
            .map(res => <Dashboard>res.json()['_embedded'][this.repositoryName][0])
            .share();
    }

    createDefaultDashboard(): Observable<Dashboard> {
        let dashboard: Dashboard = <Dashboard>{
            name: 'default',
            icon: 'fa-desktop'
        };
        return this.createResource(dashboard);
    }
}
