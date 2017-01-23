import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../crud/crud.service';
import { Location } from '@angular/common';
import { BtnTypes } from '../../../crud/dynamic-form/model/button-types';
import { FormPropertyModel } from '../../../crud/model/form-property';

@Component({
    selector: 'dashboard-crud-edit',
    template: '<dynamic-form [btnName]="btnName" [columnDefs]="columnDefs"></dynamic-form>'
})
export class DashboardCrudCreateComponent {
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

        this.columnDefs = this.route.snapshot.data['create'];
    }

    /**
     * Back to dashboards
     */
    back() {
        this.location.back();
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    onSubmit() {
        alert();
        this.crudService.createRecord(this.crudService.model,
            this.route.snapshot.params['className']);
    }
}
