import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Location } from '@angular/common';

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
