import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";
import { BtnTypes } from "../dynamic-form/model/button-types";
import { ColumnDef } from "../model/column-definition";

@Component({
    selector: 'crud-update',
    template: '<dynamic-form [formType]="btnName" [model]="model" [columnDefs]="columnDefs"></dynamic-form>',
    styleUrls: [
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudUpdateComponent {
    public btnName: BtnTypes = BtnTypes.UPDATE;
    public columnDefs: ColumnDef[] = [];
    public model = {};

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.columnDefs = this.getColunmDefs();
        this.model = this.getModel();
    }

    getColunmDefs() {
        return this.route.snapshot.data['edit'].columnDefs;
    }

    getModel() {
        return this.route.snapshot.data['edit'].rowData;
    }

    onSubmit() {
        // this.crudService.updateRecord(this.crudService.model);
    }

}
