import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {NgForm} from "@angular/forms";
import {DashboardBox} from "../dashboard-box.model";
import {DashboardBoxService} from "../dashboard-box.service";
import {NotificationService} from "../../../services/notification-service";
import {ControlErrorService} from "../../../services/control-error";
import {ActivatedRoute, Params} from "@angular/router";
import {DashboardService} from "../../dashboard.service";
import {DashboardBoxTypeService} from "../../dashboard-box-type/dashboard-box-type.service";

@Component({
    selector: 'dashboard-box-create',
    templateUrl: 'dashboard-box-create.component.html'
})
export class DashboardBoxCreateComponent {

    public isLoading: boolean = false;

    public model: DashboardBox = <DashboardBox>{};

    public dashboardId: number = null;

    constructor(public dashboardBoxService: DashboardBoxService,
                public dashboardService: DashboardService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location,
                public route: ActivatedRoute,
                public dashboardBoxTypeService: DashboardBoxTypeService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => this.dashboardId = Number(params['id']));
    }

    onSubmit(dashboardBoxForm: NgForm) {
        this.toggleLoading();
        this.model['dashboard'] = this.dashboardService.getSelfLinkedEntityById(this.dashboardId)._links.self.href;
        this.dashboardBoxService.createResource(this.model)
            .subscribe(() => {
                this.toggleLoading();
                this.location.back();
                this.notification.createNotification('success', 'SUCCESS', 'dashboardBox.successCreateDashboardBox');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), dashboardBoxForm);
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
