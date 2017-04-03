import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {NgForm} from "@angular/forms";

import {NotificationService} from "../../services/notification-service";
import {ControlErrorService} from "../../services/control-error";
import {MCCService} from "../mcc.service";

@Component({
    selector: 'mcc-create',
    templateUrl: 'mcc-create.component.html'
})
export class MCCCreateComponent {

    public isLoading: boolean = false;

    constructor(public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public mccService: MCCService,
                public location: Location) {
    }

    onSubmit(f: NgForm) {
        this.toggleLoading();
        this.mccService.createResource(f.value)
            .subscribe(() => {
                this.toggleLoading();
                this.location.back();
                this.notification.createNotification(
                    'success', 'SUCCESS', 'mcc.successCreateMCC');
            }, (e) => {
                this.toggleLoading();
                this.controlErrorService.formControlErrors(e.json(), f);
            });
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
