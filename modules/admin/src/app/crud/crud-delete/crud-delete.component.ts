import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";
import { Message } from "primeng/components/common/api";
import { BackendService } from "../../services/backend/backend.service";
import { GrowlService } from "../../services/growl/growl.service";
import { NotificationService } from "../../services/notification-service";

@Component({
    selector: 'crud-delete',
    template: require('./crud-delete.component.html'),
    styleUrls: [
        require('./crud-delete.component.scss'),
        require('../common/style.scss')
    ],
    providers: []
})

export class CrudDeleteComponent {
    public id;
    msgs: Message[] = [];

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public backendService: BackendService,
                private notifications: NotificationService) {
    }

    ngOnInit() {
        this.translate.get('crud.confirmDeleteMsg')
            .subscribe(detail => {
                this.msgs.push({ severity: 'warn', detail: detail });
            });

        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });
    }

    back() {
        this.location.back();
    }

    delete() {
        this.backendService.deleteResource(this.id, this.crudService.getRepositoryName())
            .subscribe(res => {
                this.notifications.createNotification('success', 'SUCCESS', 'crud.successDelete');
            }, err => {
                console.error(err);
                this.notifications.createNotification('error', 'ERROR', 'crud.errorDelete');
            })
    }
}
