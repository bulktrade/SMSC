import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Message} from "primeng/components/common/api";
import {DashboardBoxService} from "../dashboard-box.service";
import {NotificationService} from "../../../services/notification-service";

@Component({
    selector: 'dashboard-box-delete',
    templateUrl: './../../../shared/templates/delete.component.html',
    styleUrls: ['./../../../shared/styles/delete.component.scss']
})

export class DashboardBoxDeleteComponent {
    public id: number;
    public msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public dashboardBoxService: DashboardBoxService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => this.id = Number(params['dashboardBoxId']));
        this.translate.get('dashboardBox.confirmDelete')
            .subscribe(detail => {
                this.msgs.push({severity: 'warn', detail: detail});
            });
    }

    onBack() {
        this.location.back();
    }

    deleteResource() {
        this.dashboardBoxService.deleteResourceById(this.id)
            .subscribe(() => {
                this.onBack();
                this.notifications.createNotification('success', 'SUCCESS', 'dashboardBox.successDeleteDashboardBox');
            }, err => {
                this.notifications.createNotification('error', 'ERROR', 'dashboardBox.errorDeleteDashboardBox');
            });
    }
}
