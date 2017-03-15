import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Message} from "primeng/components/common/api";
import {NotificationService} from "../../services/notification-service";
import {CustomersService} from "../customer.service";
import {DashboardService} from "../dashboard.service";

@Component({
    selector: 'dashboard-delete',
    templateUrl: './../../shared/templates/delete.component.html',
    styleUrls: ['./../../shared/styles/delete.component.scss']
})

export class DashboardDeleteComponent {
    public id: number;
    public msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public dashboardService: DashboardService,
                public route: ActivatedRoute,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => this.id = Number(params['id']));
        this.translate.get('dashboard.confirmDelete')
            .subscribe(detail => {
                this.msgs.push({severity: 'warn', detail: detail});
            });
    }

    onBack() {
        this.location.back();
    }

    deleteResource() {
        this.dashboardService.deleteResourceById(this.id)
            .subscribe(() => {
                this.notifications.createNotification('success', 'SUCCESS', 'dashboard.successDeleteDashboard');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'dashboard.errorDeleteDashboard');
            });
    }
}
