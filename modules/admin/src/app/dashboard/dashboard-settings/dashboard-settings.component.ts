import {Component, ViewEncapsulation} from "@angular/core";
import {Dashboard} from "../dashboard.model";
import {ActivatedRoute} from "@angular/router";
import {DashboardBoxType} from "../dashboard-box-type/dashboard-box-type.model";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'dashboards',
    templateUrl: 'dashboard-settings.component.html',
    styleUrls: ['dashboard-settings.component.scss']
})
export class DashboardSettingsComponent {
    public dashboards: Dashboard[] = [];
    public dashboardBoxTypes: DashboardBoxType[] = [];

    constructor(public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dashboards = this.getDashboards();
        this.dashboardBoxTypes = this.getDashboardBoxTypes();
        this.removeDefaultDashboard(this.dashboards);
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

    removeDefaultDashboard(dashboards: Dashboard[]) {
        dashboards.forEach((dashboard: Dashboard, index, dashboards: Dashboard[]) => {
            if (dashboard.name === 'default') {
                dashboards.splice(index, 1);
            }
        });
    }
}
