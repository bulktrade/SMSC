import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { MultipleSelect } from "../directives/multipleSelect";
import { CrudLinkset } from "../crudLinkset/crud.linkset";
import { MdCheckbox } from "@angular2-material/checkbox/checkbox";

@Component({
    selector: 'crud-edit',
    template: require('../form.html'),
    styles: [
        require('../form.scss')
    ],
    providers: [CrudService],
    directives: [MultipleSelect, CrudLinkset, MdCheckbox],
    pipes: [TranslatePipe]
})

export class CrudEdit {
    public btnName:string = 'Update';

    constructor(public translate:TranslateService,
                public crudService:CrudService,
                public router:Router) {
    }

    ngOnInit() {
        this.crudService.initGridData = this.crudService.initGridData.then((res) => {
            this.crudService.model = this.crudService.crudModel.rowData[this.crudService.focusedRow];
        })
    }

    ngOnDestroy() {
        this.crudService.addingFormValid = false;
    }

    onSubmit() {
        this.crudService.updateRecord(this.crudService.model);
        this.router.navigateByUrl(this.crudService.currPath);
    }

    isRequired(event) {
        if (event) {
            this.crudService.addingFormValid = true;
            return;
        }
    }

}
