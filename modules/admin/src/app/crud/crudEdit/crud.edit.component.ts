import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { Location } from "@angular/common";

@Component({
    selector: 'crud-edit',
    template: require('../common/form.html'),
    styles: [
        require('../common/form.scss'),
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudEdit {
    public resolveData: any;
    public btnName: string = 'UPDATE';

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data[0];

        if (this.resolveData.model) {
            this.crudService.setModel(this.resolveData.model);
        }

        this.crudService.gridOptions.columnDefs = this.resolveData.initGridData;
    }

    back() {
        this.location.back();
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.isEditForm = false;
        this.crudService.setModel({});
    }

    onSubmit() {
        this.crudService.updateRecord(this.crudService.model);
    }

}
