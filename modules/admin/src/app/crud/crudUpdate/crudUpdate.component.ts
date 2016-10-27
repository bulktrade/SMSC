import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Location } from '@angular/common';
import { EditModel } from './crudUpdate.model';
import { BtnTypes } from '../dynamicForm/model/btnTypes';
import { FormPropertyModel } from '../model/formProperty';

@Component({
    selector: 'crud-update',
    template: '<dynamic-form [btnName]="btnName" [columnDefs]="columnDefs"></dynamic-form>',
    styleUrls: [
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudUpdateComponent {
    public resolveData: EditModel;
    public btnName: BtnTypes = BtnTypes.UPDATE;
    public columnDefs: Array<FormPropertyModel> = null;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        // sets path from root component
        this.crudService.setParentPath(this.route.parent.parent.snapshot.pathFromRoot);

        this.resolveData = this.route.snapshot.data['edit'];

        if (this.resolveData.inputModel) {
            this.crudService.setModel(this.resolveData.inputModel);
        }

        this.columnDefs = this.resolveData.columnDefs.form;
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    onSubmit() {
        this.crudService.updateRecord(this.crudService.model);
    }

}
