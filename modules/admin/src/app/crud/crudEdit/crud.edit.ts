import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { MultipleSelect } from "../directives/multipleSelect";
import { CrudLinkset } from "../crudLinkset/crud.linkset";
import { MdCheckbox } from "@angular2-material/checkbox/checkbox";
import {BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {SELECT_DIRECTIVES} from "ng2-select";

@Component({
    selector: 'crud-edit',
    template: require('../form.html'),
    styles: [
        require('../form.scss')
    ],
    providers: [],
    directives: [
        MultipleSelect,
        CrudLinkset,
        MdCheckbox,
        SELECT_DIRECTIVES,
        BUTTON_DIRECTIVES
    ],
    pipes: [TranslatePipe]
})

export class CrudEdit {
    public btnName:string = 'Update';

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        this.crudService.initGridData = new Promise((resolve, reject) => {
            this.crudService.getColumnDefs(this.crudService.className, true)
                .then((columnDefs) => {
                    this.crudService.crudModel.columnDefs = columnDefs;
                })
                .then((res) => {
                    // init the row data
                    this.crudService.getStore(this.crudService.className)
                        .then((store) => {
                            this.crudService.crudModel.rowData = store;
                            this.crudService.model = this.crudService.crudModel.rowData[0];
                            resolve();
                        }, (error) => {
                            this.crudService.dataNotFound = true;
                            this.crudService.errorMessage = 'orientdb.dataNotFound';
                        });
                });
        });
    }

    ngOnDestroy() {
        this.crudService.addingFormValid = false;
        this.crudService.model = {};
    }

    onSubmit() {
        this.crudService.updateRecord(this.crudService.model);
        this.router.navigateByUrl(this.crudService.parentPath);
    }

    isRequired(event) {
        if (event) {
            this.crudService.addingFormValid = true;
            return;
        }
    }

}
