import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CrudService } from '../../../crud/crud.service';

@Component({
    selector: 'crud-delete',
    template: require('./dashboard-box-delete.component.html'),
    styleUrls: [
        require('./dashboard-box-delete.component.scss'),
        require('../../../crud/common/style.scss')
    ],
    providers: []
})

export class DashboardCrudDeleteComponent {
    public id;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });
    }

    back() {
        this.location.back();
    }

    deleteRecords() {
        this.crudService.deleteRecord(this.id.split(','))
            .subscribe(() => {
                this.back();
            }, (error) => {
                this.crudService.serviceNotifications.createNotificationOnResponse(error);
            });
    }

}
