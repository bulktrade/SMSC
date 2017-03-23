import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {NgForm} from "@angular/forms";
import {DashboardBoxTypeService} from "../dashboard-box-type.service";
import {NotificationService} from "../../../services/notification-service";
import {ControlErrorService} from "../../../services/control-error";

@Component({
    selector: 'dashboard-box-type-create',
    templateUrl: 'dashboard-box-type-create.component.html'
})
export class DashboardBoxTypeCreateComponent {

    public isLoading: boolean = false;

    constructor(public dashboardBoxTypeService: DashboardBoxTypeService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location) {
    }

    onSubmit(form: NgForm) {
        this.toggleLoading();
        this.dashboardBoxTypeService.createResource(form.value)
            .subscribe(() => {
                this.toggleLoading();
                this.location.back();
                this.notification.createNotification(
                    'success', 'SUCCESS', 'dashboardBoxType.successCreateDashboardBoxType');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), form);
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
