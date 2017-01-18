import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";
import { BtnTypes } from "../dynamic-form/model/button-types";
import { ColumnDef } from "../model/column-definition";
import { BackendService } from "../../services/backend/backend.service";
import { NotificationService } from "../../services/notification-service";

@Component({
    selector: 'crud-update',
    template: '<dynamic-form [formType]="btnName" [model]="model" [columnDefs]="columnDefs" (onSubmit)="onSubmit($event)"></dynamic-form>',
    styleUrls: [
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudUpdateComponent {
    public id;
    public btnName: BtnTypes = BtnTypes.UPDATE;
    public columnDefs: ColumnDef[] = [];
    public model = {};

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public backendService: BackendService,
                public notifications: NotificationService) {
    }

    ngOnInit() {
        // get id parameter
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });

        this.columnDefs = this.getColunmDefs();
        this.model = this.getModel();
    }

    getColunmDefs() {
        return this.route.snapshot.data['edit'].columnDefs;
    }

    getModel() {
        return this.route.snapshot.data['edit'].rowData;
    }

    onSubmit(data) {
        this.backendService.updateResource(this.id, data, this.crudService.getRepositoryName())
            .subscribe(res => {
                this.notifications.createNotification('success', 'SUCCESS', 'crud.successUpdate');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'crud.errorUpdate');
            })
    }

}
