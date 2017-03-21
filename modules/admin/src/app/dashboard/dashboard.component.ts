import {Component} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import {MenuItem} from "primeng/components/common/api";
import {TranslateService} from "ng2-translate";
import {DashboardBox} from "./dashboard-box/dashboard-box.model";
import {DragulaService} from "ng2-dragula";
import {DashboardBoxService} from "./dashboard-box/dashboard-box.service";
import * as _ from "lodash";
import {NotificationService} from "../services/notification-service";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    id: number = null;

    dashboardBoxes: DashboardBox[] = [];

    menuItems: MenuItem[];

    constructor(public route: ActivatedRoute,
                public router: Router,
                public translateService: TranslateService,
                public dashboardService: DashboardService,
                public dashboardBoxService: DashboardBoxService,
                public dragulaService: DragulaService,
                public notification: NotificationService) {
        dragulaService.setOptions('dashboard-boxes', {direction: 'horizontal'});
        dragulaService.dropModel.subscribe((value) => this.onDropModel());
    }

    private onDropModel() {
        this.dashboardBoxes.forEach((dashboardBox, i, dashboardBoxes) => {
            if (dashboardBox.order !== i + 1) {
                dashboardBoxes[i].order = i + 1;
                this.dashboardBoxService.updateResource(dashboardBoxes[i])
                    .subscribe(null, (e) => {
                        this.notification.createNotification('error', 'ERROR', 'ERROR_UPDATE');
                    });
            }
        });
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = Number(params['id']);
            this.dashboardBoxes = this.getDashboardBoxes();
            this.dashboardBoxes = this.sortDashboardBoxes(this.dashboardBoxes);
            this.menuItems = [
                {label: 'dashboard.createDashboard', icon: 'fa-plus', routerLink: ['/dashboard', 'create']},
                {label: 'dashboard.updateDashboard', icon: 'fa-pencil', routerLink: ['/dashboard', this.id, 'update']},
                {label: 'dashboard.deleteDashboard', icon: 'fa-minus', routerLink: ['/dashboard', this.id, 'delete']}
            ];
            this.translateMenuItems();
        });
    }

    sortDashboardBoxes(dashboardBoxes: DashboardBox[]) {
        return _.sortBy(dashboardBoxes, [(dashboardBox: DashboardBox) => dashboardBox.order]);
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
