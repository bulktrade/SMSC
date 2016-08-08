import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";

@Component({
    selector: 'crud-delete',
    template: require('./crud.delete.html'),
    styles: [
        require('./crud.delete.scss'),
        require('../common/style.scss')
    ],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})

export class CrudDelete {
    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        // init the row data
        this.crudService.getStore(this.crudService.className)
            .then((store) => {
                this.crudService.crudModel.rowData = store;
            }, (error) => {
                this.crudService.dataNotFound = true;
                this.crudService.errorMessage = 'orientdb.dataNotFound';
            });
    }

}
