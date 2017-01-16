import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";
import { Message } from "primeng/components/common/api";

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
                public location: Location) {
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

    deleteRecords() {
        // this.crudService.deleteRecord(this.id.split(','))
        //     .subscribe(() => {
        //         this.back();
        //     }, (error) => {
        //         this.crudService.serviceNotifications.createNotificationOnResponse(error);
        //     });
    }

}
