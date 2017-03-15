import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Dashboard} from "./dashboard.model";
import {DashboardService} from "./dashboard.service";
import {MenuItem} from "primeng/components/common/api";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'dashboard',
    template: `
    <div class="dashboard-toolbar">
        <p-splitButton icon="fa-cog" menuStyleClass="ui-button-success"
         [model]="menuItems"></p-splitButton>
    </div>
    <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div></div></div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div></div></div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div></div></div>
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div></div></div>
    </div>
    `,
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    id: number = null;
    dashboard: Dashboard = null;
    menuItems: MenuItem[];

    constructor(public route: ActivatedRoute,
                public translateService: TranslateService,
                public dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = Number(params['id']);
            this.dashboard = this.getDashboard();
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

    getDashboard(): Dashboard {
        return this.route.snapshot.data['dashboard'];
    }
}
