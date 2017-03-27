import {Component, Input, Output, EventEmitter} from "@angular/core";
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

    @Input() model: DashboardBox = <DashboardBox>{};

    @Output() modelChange: EventEmitter<DashboardBox> = new EventEmitter();

    id: number = null;

    isLoading: boolean = false;

    constructor(public dashboardBoxService: DashboardBoxService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('dashboardBoxId'));
    }

    onSubmit(dashboardBoxForm: NgForm) {
        this.toggleLoading();
        this.dashboardBoxService.updateResource(this.model)
            .subscribe((dashboardBox: DashboardBox) => {
                this.toggleLoading();
                this.notification.createNotification('success', 'SUCCESS', 'dashboardBox.successUpdateDashboardBox');
                this.modelChange.emit(dashboardBox);
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), dashboardBoxForm);
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
