import {Component, ViewEncapsulation} from "@angular/core";
import {Dashboard} from "../dashboard.model";
import {ActivatedRoute} from "@angular/router";
import {DashboardBoxType} from "../dashboard-box-type/dashboard-box-type.model";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'dashboards',
    templateUrl: 'dashboards.component.html',
    styleUrls: ['dashboards.component.scss']
})
export class DashboardsComponent {
    public dashboards: Dashboard[] = [];
    public dashboardBoxTypes: DashboardBoxType[] = [];

    constructor(public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dashboards = this.getDashboards();
        this.dashboardBoxTypes = this.getDashboardBoxTypes();
    }

    idDashboards() {
        return this.dashboards.length > 0;
    }

    getDashboards(): Dashboard[] {
        return <Dashboard[]>this.route.snapshot.data['dashboards'].dashboards;
    }

    getDashboardBoxTypes(): DashboardBoxType[] {
        return <DashboardBoxType[]>this.route.snapshot.data['dashboards'].dashboardBoxTypes;
    }
}
