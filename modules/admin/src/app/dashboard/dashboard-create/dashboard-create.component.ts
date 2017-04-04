import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Dashboard} from "../dashboard.model";
import {NgForm} from "@angular/forms";
import {DashboardService} from "../dashboard.service";
import {NotificationService} from "../../services/notification-service";
import {ControlErrorService} from "../../services/control-error";

@Component({
    selector: 'dashboard-create',
    templateUrl: 'dashboard-create.component.html'
})
export class DashboardCreateComponent {
    isLoading: boolean = false;
    model: Dashboard = <Dashboard>{};

    constructor(public dashboardService: DashboardService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location) {
    }

    onSubmit(dashboardForm: NgForm) {
        this.toggleLoading();
        this.dashboardService.createResource(this.model)
            .subscribe((dashboard: Dashboard) => {
                this.toggleLoading();
                this.location.back();
                this.notification.createNotification('success', 'SUCCESS', 'dashboard.successCreateDashboard');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), dashboardForm);
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
