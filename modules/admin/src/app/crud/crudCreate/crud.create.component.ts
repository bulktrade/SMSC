import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Location } from '@angular/common';
import { ColumnDefsModel } from '../model/columnDefs.model';
import { BtnTypes } from '../../dynamicForm/btn.types';

@Component({
    selector: 'crud-create',
    template: '<dynamic-form [btnName]="btnName"></dynamic-form>',
    styleUrls: [
        require('../common/style.scss')
    ],
    providers: [Location]
})

export class CrudCreate {
    public resolveData: ColumnDefsModel = null;
    public btnName: BtnTypes = BtnTypes.CREATE;

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data['create'];
        this.crudService.gridOptions.columnDefs = this.resolveData.form;
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
