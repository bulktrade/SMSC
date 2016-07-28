import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudModel } from "../crud.model";

@Component({
    selector: 'crud-delete',
    template: require('./crud.delete.html'),
    styles: [
        require('./crud.delete.scss')
    ],
    providers: [CrudService],
    directives: [],
    pipes: [TranslatePipe]
})

export class CrudDelete {
    model = new CrudModel([], []);

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        // init the row data
        this.crudService.getStore()
            .then((store) => {
                this.model.rowData = store;
            }, (error) => {
                this.crudService.dataNotFound = true;
                this.crudService.errorMessage = 'orientdb.dataNotFound';
            });
    }

}
