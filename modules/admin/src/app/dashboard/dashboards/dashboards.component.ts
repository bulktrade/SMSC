import {Component, ViewEncapsulation} from "@angular/core";
import {Dashboard} from "../dashboard.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'dashboards',
    templateUrl: 'dashboards.component.html',
    styleUrls: ['dashboards.component.scss']
})
export class DashboardsComponent {
    public dashboards: Dashboard[] = [];

    constructor(public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dashboards = this.getDashboards();
    }

    idDashboards() {
        return this.dashboards.length > 0;
    }

    getDashboards(): Dashboard[] {
        return <Dashboard[]>this.route.snapshot.data['dashboards'];
    }
}
