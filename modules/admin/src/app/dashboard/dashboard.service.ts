import {Injectable} from "@angular/core";
import {Http, RequestMethod, RequestOptions} from "@angular/http";
import {Dashboard} from "./dashboard.model";
import {CrudRepository} from "../shared/crud-repository";
import {ConfigService} from "../config/config.service";
import {UserService} from "../users/user.service";
import {User} from "../users/user.model";
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

    getDashboards(): Observable<Dashboard[]> {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get
        });

        return Observable.create(o => {
            this.userService.getLoggedUser()
                .subscribe((user: User) => {
                    this.http.request(user._links.dashboards.href, requestOptions)
                        .map(res => res.json()['_embedded'][this.repositoryName])
                        .subscribe((dashboards: Dashboard) => {
                            o.next(dashboards);
                            o.complete();
                        }, e => {
                            o.error(e);
                            o.complete();
                        });
                }, e => {
                    o.error(e);
                    o.complete();
                });
        });
    }

    createDefaultDashboard(): Observable<Dashboard> {
        let dashboard: Dashboard = <Dashboard>{
            name: 'default',
            icon: 'fa-desktop'
        };

        return Observable.create(o => {
            this.userService.getLoggedUser()
                .subscribe((user: User) => {
                    dashboard['user'] = user._links.self.href;
                    this.createResource(dashboard).subscribe((dashboard: Dashboard) => {
                        o.next(dashboard);
                        o.complete();
                    }, e => {
                        o.error(e);
                        o.complete();
                    });
                }, e => {
                    o.error(e);
                    o.complete();
                });
        });
    }
}
