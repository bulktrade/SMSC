import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Location } from '@angular/common';
import { EditModel } from './crudEdit.model';
import { BtnTypes } from '../dynamicForm/btn.types';

@Component({
    selector: 'crud-edit',
    template: '<dynamic-form [btnName]="btnName"></dynamic-form>',
    styleUrls: [
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudEdit {
    public resolveData: EditModel;
    public btnName: BtnTypes = BtnTypes.UPDATE;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data['edit'];

        if (this.resolveData.inputModel) {
            this.crudService.setModel(this.resolveData.inputModel);
        }

        this.crudService.gridOptions.columnDefs = this.resolveData.columnDefs.form;
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    onSubmit() {
        this.crudService.updateRecord(this.crudService.model);
    }

}
