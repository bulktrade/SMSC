import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { MultipleSelect } from "../directives/multipleSelect";
import { CrudLinkset } from "../crudLinkset/crud.linkset";
import { MdCheckbox } from "@angular2-material/checkbox/checkbox";

@Component({
    selector: 'crud-create',
    template: require('../form.html'),
    styles: [
        require('../form.scss')
    ],
    providers: [CrudService],
    directives: [MultipleSelect, CrudLinkset, MdCheckbox],
    pipes: [TranslatePipe]
})

export class CrudCreate {
    public btnName:string = 'Create';

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
    }

    edit() {
        this.crudService.createRecord(this.crudService.model);
        this.router.navigateByUrl(this.crudService.currPath)
    }

}
