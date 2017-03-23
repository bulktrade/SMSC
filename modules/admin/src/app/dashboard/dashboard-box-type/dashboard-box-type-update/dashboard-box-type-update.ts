import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Dashboard} from "../dashboard.model";
import {NgForm} from "@angular/forms";
import {DashboardService} from "../dashboard.service";
import {ActivatedRoute, Params} from "@angular/router";
import {DashboardBoxType} from "../dashboard-box-type.model";
import {DashboardBoxTypeService} from "../dashboard-box-type.service";
import {NotificationService} from "../../../services/notification-service";
import {ControlErrorService} from "../../../services/control-error";

@Component({
    selector: 'dashboard-box-type-update',
    templateUrl: 'dashboard-box-type-update.component.html'
})
export class DashboardBoxTypeUpdateComponent {

    public isLoading: boolean = false;

    public model: DashboardBoxType = <DashboardBoxType>{};

    public id: number = null;

    constructor(public dashboardBoxService: DashboardBoxTypeService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => this.id = Number(params['id']));
        this.model = this.getDashboardBoxType();
    }

    onSubmit(f: NgForm) {
        this.toggleLoading();
        this.dashboardBoxService.updateResource(this.model)
            .subscribe(() => {
                this.toggleLoading();
                this.location.back();
                this.notification.createNotification('success', 'SUCCESS', 'dashboardBoxType.successUpdateDashboardBoxType');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), f);
            });
    }

    getDashboardBoxType(): DashboardBoxType {
        return <DashboardBoxType>this.route.snapshot.data['update'];
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
