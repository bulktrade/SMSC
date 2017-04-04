import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

import {MCCService} from "../mcc.service";
import {MCC} from "../mcc.model";
import {NotificationService} from "../../services/notification-service";
import {ControlErrorService} from "../../services/control-error";

@Component({
    selector: 'mcc-update',
    templateUrl: 'mcc-update.component.html'
})
export class MCCUpdateComponent {

    public isLoading: boolean = false;

    public model: MCC = <MCC>{};

    public id: number = null;

    constructor(public mccService: MCCService,
                public notification: NotificationService,
                public controlErrorService: ControlErrorService,
                public location: Location,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.model = this.getMCC();
    }

    onSubmit(f: NgForm) {
        this.toggleLoading();
        this.mccService.updateResource(this.model)
            .subscribe(
                () => {
                    this.toggleLoading();
                    this.location.back();
                    this.notification.createNotification('success', 'SUCCESS', 'mcc.successUpdateMCC');
                },
                (e) => {
                    this.toggleLoading();
                    this.controlErrorService.formControlErrors(e.json(), f);
                }
            );
    }

    getMCC(): MCC {
        return <MCC>this.route.snapshot.data['update'];
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
