import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { CrudModel } from "../crud.model";

@Component({
    selector: 'crud-create',
    template: require('./crud.create.html'),
    styles: [
        require('./crud.create.scss')
    ],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})

export class CrudCreate {
    public columnDefs = [];

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public crudModel:CrudModel,
                public router:Router) {
    }

    ngOnInit() {
        this.crudService.currPath = this.router.url.split('/')[1];
        this.crudService.setCrudName(this.router['config']);

        // init the column definitions
        this.crudModel.getColumnDefs(this.crudService.className, true)
            .then((columnDefs) => {
                this.columnDefs = columnDefs;
            })
    }

}
