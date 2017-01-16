import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Location } from '@angular/common';
import { BtnTypes } from '../dynamic-form/model/button-types';
import { FormPropertyModel } from '../model/form-property';

@Component({
    selector: 'crud-create',
    template: '<dynamic-form [formType]="formType" [columnDefs]="columnDefs"></dynamic-form>',
    styleUrls: [
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudCreateComponent {
    public columnDefs: Array<FormPropertyModel>;
    public formType: string = BtnTypes.CREATE;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
    }

    getColumnDefs() {
        return this.route.snapshot.data['create'];
    }

    onSubmit() {
        // this.crudService.createRecord(this.crudService.model,
        //     this.route.snapshot.params['className']);
    }

}
