import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Dashboard} from "../dashboard.model";
import {NgForm} from "@angular/forms";
import {DashboardService} from "../dashboard.service";
import {NotificationService} from "../../services/notification-service";
import {ControlErrorService} from "../../services/control-error";
import {UserService} from "../../users/user.service";
import {User} from "../../users/user.model";

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
                public userService: UserService,
                public location: Location) {
    }

    onSubmit(dashboardForm: NgForm) {
        this.toggleLoading();
        this.userService.getLoggedUser()
            .subscribe((user: User) => {
                this.model['user'] = user._links.self.href;
                this.dashboardService.createResource(this.model)
                    .subscribe((dashboard: Dashboard) => {
                        this.toggleLoading();
                        this.notification.createNotification('success', 'SUCCESS', 'dashboard.successCreateDashboard');
                    }, (e) => {
                        this.toggleLoading();
                        this.controlErrorService.formControlErrors(e.json(), dashboardForm);
                    });
            }, e => {
                this.toggleLoading();
                this.notification.createNotification('error', 'ERROR', 'user.notFound');
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
