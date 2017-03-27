import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Dashboard} from "../dashboard.model";
import {NgForm} from "@angular/forms";
import {DashboardService} from "../dashboard.service";
import {NotificationService} from "../../services/notification-service";
import {ControlErrorService} from "../../services/control-error";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'dashboard-update',
    templateUrl: 'dashboard-update.component.html'
})
export class DashboardUpdateComponent {
    isLoading: boolean = false;
    model: Dashboard = <Dashboard>{};
    id: number = null;

    constructor(public dashboardService: DashboardService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.model = this.getDashboard();
    }

    onSubmit(dashboardForm: NgForm) {
        this.toggleLoading();
        this.dashboardService.updateResource(this.model)
            .subscribe((dashboard: Dashboard) => {
                this.toggleLoading();
                this.location.back();
                this.notification.createNotification('success', 'SUCCESS', 'dashboard.successUpdateDashboard');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), dashboardForm);
            });
    }

    getDashboard(): Dashboard {
        return this.route.snapshot.data['update'];
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
