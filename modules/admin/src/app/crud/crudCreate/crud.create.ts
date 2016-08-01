import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import {MultipleSelect} from "../directives/multipleSelect";
import {CrudLinkset} from "../crudLinkset/crud.linkset";

@Component({
    selector: 'crud-create',
    template: require('./crud.create.html'),
    styles: [
        require('./crud.create.scss')
    ],
    providers: [CrudService],
    directives: [MultipleSelect, CrudLinkset],
    pipes: [TranslatePipe]
})

export class CrudCreate {
    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        this.crudService.initGridData = this.crudService.initGridData.then((res) => {
            if (localStorage.getItem('isEditForm')) {
                this.crudService.model = this.crudService.crudModel.rowData[this.crudService.focusedRow];
            }
        })
    }

    ngOnDestroy() {
        localStorage.setItem('isEditForm', '');
    }

    edit() {
        if (localStorage.getItem('isEditForm')) {
            this.crudService.updateRecord(this.crudService.model);
        } else {
            this.crudService.createRecord(this.crudService.model);
        }

        this.router.navigateByUrl(this.crudService.currPath)
    }

}
