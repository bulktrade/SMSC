import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Dashboard} from "./dashboard.model";

@Component({
    selector: 'dashboards',
    template: `<h1>Dashboard module!</h1>`
})
export class DashboardsComponent {
    id: number = null;
    dashboards: Dashboard[] = [];

    constructor(public route: ActivatedRoute) {
        this.route.params.subscribe((params: Params) => this.id = Number(params['id']));
    }

    ngOnInit() {
        this.dashboards = this.getDashboards();
        console.log(this.dashboards);
    }

    getDashboards(): Dashboard[] {
        return this.route.snapshot.data['dashboards'];
    }
}
