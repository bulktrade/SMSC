import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";
import { BtnTypes } from "../dynamic-form/model/button-types";
import { FormPropertyModel } from "../model/form-property";
import { NotificationService } from "../../services/notification-service";
import { BackendService } from "../../services/backend/backend.service";

@Component({
    selector: 'crud-create',
    template: '<dynamic-form [formType]="formType" [columnDefs]="columnDefs" (onSubmit)="onSubmit($event)"></dynamic-form>',
    styleUrls: [
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudCreateComponent {
    public columnDefs: Array<FormPropertyModel>;
    public formType: string = BtnTypes.CREATE;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public backendService: BackendService,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
    }

    getColumnDefs() {
        return this.route.snapshot.data['create'];
    }

    onSubmit(data) {
        this.backendService.createResource(data, this.crudService.getRepositoryName())
            .subscribe(res => {
                this.notifications.createNotification('success', 'SUCCESS', 'crud.successCreate');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'crud.errorCreate');
            })
    }

}
