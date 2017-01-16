import { Component, Input, NgModule, ModuleWithProviders } from '@angular/core';
import { CrudService } from '../crud.service';
import { Location, CommonModule } from '@angular/common';
import { BtnTypes } from './model/button-types';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSelectModule } from '../../common/material/select/select.component';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { FormsModule } from '@angular/forms';
import { LoadingGridModule } from '../../common/loading-grid.component';
import { MultipleSelectModule } from '../directives/multiple-select/multiple-select.component';
import { FormPropertyModel } from '../model/form-property';
import { PanelModule } from "primeng/components/panel/panel";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { ButtonModule } from "primeng/components/button/button";

@Component({
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styleUrls: [
        require('./dynamic-form.component.scss'),
        require('../common/style.scss')
    ]
})

export class DynamicFormComponent {
    @Input('formType')
    public formType: string;
    @Input('columnDefs')
    public columnDefs: Array<FormPropertyModel>;
    @Input('model')
    public model = {};

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public crudService: CrudService) {
    }

    onSubmit() {
        switch (this.formType) {
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
        TranslateModule,
        LoadingGridModule,
        PanelModule,
        InputTextModule,
        ButtonModule
    ],
    exports: [DynamicFormComponent],
    declarations: [DynamicFormComponent]
})
export class DynamicFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicFormModule,
            providers: []
        };
    }
}
