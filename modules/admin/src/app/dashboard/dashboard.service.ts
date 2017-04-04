import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Dashboard} from "./dashboard.model";
import {CrudRepository} from "../shared/crud-repository";
import {ConfigService} from "../config/config.service";
import {UserService} from "../users/user.service";
import {Observable} from "rxjs";

export const REPOSITORY_NAME: string = 'dashboards';

@Injectable()
export class DashboardService extends CrudRepository<Dashboard> {
    public repositoryName = REPOSITORY_NAME;
    public titleColumns = 'name';

    constructor(public http: Http,
                public configService: ConfigService,
                public userService: UserService) {
        super(http, configService);
    }

    createDefaultDashboard(): Observable<Dashboard> {
        let dashboard: Dashboard = <Dashboard>{
            name: 'default',
            icon: 'fa-desktop'
        };
        return this.createResource(dashboard);
    }
}
