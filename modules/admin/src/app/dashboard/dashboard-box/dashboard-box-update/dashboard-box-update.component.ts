import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {DashboardBox} from "../dashboard-box.model";
import {DashboardBoxService} from "../dashboard-box.service";
import {NotificationService} from "../../../services/notification-service";
import {ControlErrorService} from "../../../services/control-error";

@Component({
    selector: 'dashboard-box-update',
    templateUrl: 'dashboard-box-update.component.html'
})
export class DashboardBoxUpdateComponent {
    isLoading: boolean = false;
    model: DashboardBox = <DashboardBox>{};
    id: number = null;

    constructor(public dashboardBoxService: DashboardBoxService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => this.id = Number(params['dashboardBoxId']));
        this.model = this.getDashboardBox();
    }

    onSubmit(dashboardBoxForm: NgForm) {
        this.toggleLoading();
        this.dashboardBoxService.updateResource(this.model)
            .subscribe((dashboard: DashboardBox) => {
                this.toggleLoading();
                this.location.back();
                this.notification.createNotification('success', 'SUCCESS', 'dashboardBox.successUpdateDashboardBox');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), dashboardBoxForm);
            });
    }

    getDashboardBox(): DashboardBox {
        return this.route.snapshot.data['update'];
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
