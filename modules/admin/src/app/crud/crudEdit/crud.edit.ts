import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {Router} from "@angular/router";
import {CrudService} from "../crud.service";
import {MultipleSelect} from "../directives/multipleSelect";
import {CrudUsers} from "../crudUsers/crud.users";

@Component({
    selector: 'crud-edit',
    template: require('./crud.edit.html'),
    styles: [
        require('./crud.edit.scss')
    ],
    providers: [CrudService],
    directives: [MultipleSelect, CrudUsers],
    pipes: [TranslatePipe]
})

export class CrudEdit {
    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        this.crudService.initGridData = this.crudService.initGridData.then((res) => {
            this.crudService.model = this.crudService.crudModel.rowData[this.crudService.focusedRow];
        })
    }
}
