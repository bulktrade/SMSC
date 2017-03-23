import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Message} from "primeng/components/common/api";
import {DashboardBoxTypeService} from "../dashboard-box-type.service";
import {NotificationService} from "../../../services/notification-service";

@Component({
    selector: 'dashboard-box-type-delete',
    templateUrl: './../../../shared/templates/delete.component.html',
    styleUrls: ['./../../../shared/styles/delete.component.scss']
})

export class DashboardBoxTypeDeleteComponent {
    public id: number;
    public msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public dashboardBoxTypeService: DashboardBoxTypeService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public notification: NotificationService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => this.id = Number(params['id']));
        this.translate.get('dashboardBoxType.confirmDelete')
            .subscribe(detail => this.msgs.push({severity: 'warn', detail: detail}));
    }

    onBack() {
        this.location.back();
    }

    deleteResource() {
        this.dashboardBoxTypeService.deleteResourceById(this.id)
            .subscribe(() => {
                this.onBack();
                this.notification.createNotification('success', 'SUCCESS', 'dashboardBoxType.successDeleteDashboardBoxType');
            }, () => {
                this.notification.createNotification('error', 'ERROR', 'dashboardBoxType.errorDeleteDashboardBoxType');
            });
    }
}
