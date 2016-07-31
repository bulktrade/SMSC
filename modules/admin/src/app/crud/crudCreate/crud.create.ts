import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import {MultipleSelect} from "../directives/multipleSelect";
import {CrudUsers} from "../crudUsers/crud.users";

@Component({
    selector: 'crud-create',
    template: require('./crud.create.html'),
    styles: [
        require('./crud.create.scss')
    ],
    providers: [CrudService],
    directives: [MultipleSelect, CrudUsers],
    pipes: [TranslatePipe]
})

export class CrudCreate {
    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
    }

}
