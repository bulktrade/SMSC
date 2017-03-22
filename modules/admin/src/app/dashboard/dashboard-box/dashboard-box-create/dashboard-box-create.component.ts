import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {NgForm} from "@angular/forms";
import {DashboardBox} from "../dashboard-box.model";
import {DashboardBoxService} from "../dashboard-box.service";
import {NotificationService} from "../../../services/notification-service";
import {ControlErrorService} from "../../../services/control-error";
import {ActivatedRoute, Params} from "@angular/router";
import {DashboardService} from "../../dashboard.service";
import {SelectItem} from "primeng/components/common/api";
import {DashboardBoxType} from "../../dashboard-box-type/dashboard-box-type.model";

@Component({
    selector: 'dashboard-box-create',
    templateUrl: 'dashboard-box-create.component.html'
})
export class DashboardBoxCreateComponent {

    public isLoading: boolean = false;

    public model: DashboardBox = <DashboardBox>{};

    dashboardId: number = null;

    dashboardBoxTypeItems: SelectItem[] = [];

    constructor(public dashboardBoxService: DashboardBoxService,
                public dashboardService: DashboardService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => this.dashboardId = Number(params['id']));
        this.dashboardBoxTypeItems = this.getDashboardBoxTypeItems();
    }

    getDashboardBoxTypeItems(): SelectItem[] {
        let dashboardBoxTypes: DashboardBoxType[] = <DashboardBoxType[]>this.route.snapshot.data['create'];
        let dashboardBoxTypeItems: SelectItem[] = [{label: '', value: null}];

        dashboardBoxTypes.forEach((dashboardBoxType: DashboardBoxType) => {
            dashboardBoxTypeItems.push({
                label: `${dashboardBoxType['id']}: ${dashboardBoxType.kind}`,
                value: dashboardBoxType._links.self.href
            });
        });

        return dashboardBoxTypeItems;
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
