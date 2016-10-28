import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../crud/crud.service';
import { Location } from '@angular/common';
import { EditModel } from '../../crud/crud-update/crud-update.model';
import { BtnTypes } from '../../crud/dynamic-form/model/button-types';
import { FormPropertyModel } from '../../crud/model/form-property';

@Component({
    selector: 'dashboard-crud-edit',
    template: '<dynamic-form [btnName]="btnName" [columnDefs]="columnDefs"></dynamic-form>'
})
export class DashboardCrudCreateComponent {
    public resolveData: EditModel = new EditModel();
    public btnName: BtnTypes = BtnTypes.CREATE;
    public columnDefs: Array<FormPropertyModel> = null;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public crudService: CrudService,
                public location: Location) {
    }

    ngOnInit() {
        // sets path from root component
        this.crudService.setParentPath(this.route.parent.snapshot.pathFromRoot);

        this.resolveData = this.route.snapshot.data['create'];
        this.columnDefs = this.resolveData['form'];
    }

    back() {
        this.location.back();
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    onSubmit() {
        this.crudService.createRecord(this.crudService.model,
            this.route.snapshot.params['className']);
    }
}
