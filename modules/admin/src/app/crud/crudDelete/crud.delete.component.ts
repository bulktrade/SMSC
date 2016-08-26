import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
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
    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router,
                public location:Location) {
    }

    ngOnInit() {
    }

    back() {
        this.location.back();
    }

    confirm() {
        this.crudService.multipleDeleteRecords();
    }

}
