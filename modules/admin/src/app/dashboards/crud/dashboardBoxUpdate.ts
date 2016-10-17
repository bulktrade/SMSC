import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud/crud.service';
import { Location } from '@angular/common';
import { EditModel } from '../../crud/crudUpdate/crudUpdate.model';
import { BtnTypes } from '../../crud/dynamicForm/btnTypes';
import { FormPropertyModel } from '../../crud/model/formProperty';

@Component({
    selector: 'dashboard-crud-edit',
    template: '<dynamic-form [btnName]="btnName" [columnDefs]="columnDefs"></dynamic-form>'
})
export class DashboardCrudUpdate {
    public resolveData: EditModel = new EditModel();
    public btnName: BtnTypes = BtnTypes.UPDATE;
    public columnDefs: Array<FormPropertyModel> = null;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public crudService: CrudService,
                public location: Location) {

    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data['edit'];

        this.columnDefs = this.resolveData.columnDefs.form;

        if (this.resolveData.inputModel) {
            this.crudService.setModel(this.resolveData.inputModel);
        }
    }

    onSubmit() {
        this.crudService.updateRecord(this.crudService.model);
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    back() {
        this.location.back();
    }
}
