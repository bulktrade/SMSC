import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {Router} from "@angular/router";
import {SidebarModel} from "./sidebar.model";
import {SidebarService} from "./sidebar.service";
import {DashboardService} from "../dashboard/dashboard.service";
import {Dashboard} from "../dashboard/dashboard.model";

@Component({
    selector: 'sidebar',
    template: `
        <sidebar-item *ngFor="let sidebarItem of sidebarItems"
                [sidebarItem]="sidebarItem" [dashboards]="dashboards"></sidebar-item>
    `
})

export class SidebarComponent {
    public sidebarItems: SidebarModel[];

    public dashboards: Dashboard[] = [];

    constructor(public translate: TranslateService,
                public router: Router,
                public sidebarService: SidebarService,
                public dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.sidebarItems = this.sidebarService.getSidebarItems();
        this.dashboardService.onResourceChange.subscribe(() => this.updateDashboards());
        this.updateDashboards();
    }

    updateDashboards() {
        this.dashboardService.getDashboards().subscribe((_dashboards: Dashboard[]) => this.dashboards = _dashboards);
    }
}
