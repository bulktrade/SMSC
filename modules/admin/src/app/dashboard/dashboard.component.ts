import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import {MenuItem} from "primeng/components/common/api";
import {TranslateService} from "ng2-translate";
import {DashboardBox} from "./dashboard-box/dashboard-box.model";

@Component({
    selector: 'dashboard',
    template: `
    <div class="dashboard-toolbar">
        <p-splitButton icon="fa-cog" menuStyleClass="ui-button-success"
         [model]="menuItems"></p-splitButton>
    </div>
    <div class="row" *ngIf="isDashboardBoxes()">
        <dashboard-box *ngFor="let dashboardBox of dashboardBoxes" [dashboardBox]="dashboardBox"></dashboard-box>
    </div>
    <p-panel *ngIf="!isDashboardBoxes()">
        <p-header>{{ 'DASHBOARD_BOXES' | translate }}</p-header>
        <span>No dashboard boxes found</span>
    </p-panel>
    `,
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    id: number = null;
    dashboardBoxes: DashboardBox[] = [];
    menuItems: MenuItem[];

    constructor(public route: ActivatedRoute,
                public translateService: TranslateService,
                public dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = Number(params['id']);
            this.dashboardBoxes = this.getDashboardBoxes();
            this.menuItems = [
                {label: 'dashboard.createDashboard', icon: 'fa-plus', routerLink: ['/dashboard', 'create']},
                {label: 'dashboard.updateDashboard', icon: 'fa-pencil', routerLink: ['/dashboard', this.id, 'update']},
                {label: 'dashboard.deleteDashboard', icon: 'fa-minus', routerLink: ['/dashboard', this.id, 'delete']}
            ];
            this.translateMenuItems();
        });
    }

    translateMenuItems() {
        this.menuItems.forEach((item, i, arr) => {
            this.translateService.get(item.label)
                .subscribe(label => {
                    arr[i].label = label;
                });
        });
    }

    isDashboardBoxes(): boolean {
        return this.dashboardBoxes.length > 0;
    }

    getDashboardBoxes(): DashboardBox[] {
        return <DashboardBox[]>this.route.snapshot.data['dashboard'];
    }
}
