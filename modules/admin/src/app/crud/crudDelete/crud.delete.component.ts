import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";
import { LoadingGrid } from "../../common/loadingGrid";

@Component({
    selector: 'crud-delete',
    template: require('./crud.delete.html'),
    styles: [
        require('./crud.delete.scss'),
        require('../common/style.scss')
    ],
    providers: [],
    directives: [
        LoadingGrid
    ],
    pipes: [TranslatePipe]
})

export class CrudDelete {
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
        })
    }

    back() {
        this.location.back();
    }

    deleteRecords() {
        this.crudService.multipleDeleteRecords(this.id)
            .then(() => {
                this.back();
            }, (error) => {
                this.crudService.serviceNotifications.createNotificationOnResponse(error);
            });
    }

}
