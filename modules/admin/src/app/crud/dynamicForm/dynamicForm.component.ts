import { Component, Input, NgModule } from '@angular/core';
import { CrudService } from '../crud.service';
import { Location, CommonModule } from '@angular/common';
import { BtnTypes } from './model/btnTypes';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSelectModule } from '../../common/material/select/select.component';
import { MdModule } from '../../md.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { FormsModule } from '@angular/forms';
import { LoadingGridModule } from '../../common/loadingGrid.component';
import { MultipleSelectModule } from '../directives/multipleSelect/multipleSelect.component';
import { FormPropertyModel } from '../model/formProperty';

@Component({
    selector: 'dynamic-form',
    template: require('./dynamicForm.component.html'),
    styleUrls: [
        require('./dynamicForm.component.scss'),
        require('../common/style.scss')
    ]
})

export class DynamicFormComponent {
    @Input('btnName')
    public btnName: BtnTypes;
    @Input('columnDefs')
    public columnDefs: Array<FormPropertyModel>;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public crudService: CrudService) {
    }

    onSubmit() {
        switch (this.btnName) {
            case BtnTypes.UPDATE:
                this.crudService.updateRecord(this.crudService.model);
                break;
            case BtnTypes.CREATE:
                    this.crudService.createRecord(this.crudService.model,
                    this.route.snapshot.params['className']);
                break;
            default:
                break;
        }
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    back() {
        this.location.back();
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        LoadingGridModule,
        MdSelectModule.forRoot(),
        MultipleSelectModule.forRoot(),
        MdModule.forRoot(),
        TranslateModule,
        LoadingGridModule
    ],
    exports: [DynamicFormComponent],
    declarations: [DynamicFormComponent],
    providers: [
        CrudService
    ]
})
export class DynamicFormModule {
}
