import { Component, Input, NgModule } from "@angular/core";
import { CrudService } from "../crud/crud.service";
import { Location, CommonModule } from "@angular/common";
import { BtnTypes } from "./btn.types";
import { Router, ActivatedRoute } from "@angular/router";
import { MdSelectModule } from "../common/material/select/select";
import { MdModule } from "../md.module";
import { TranslateModule } from "ng2-translate/ng2-translate";
import { FormsModule } from "@angular/forms";
import { LoadingGridModule } from "../common/loadingGrid";
import { MultipleSelectModule } from "../crud/directives/multipleSelect/multipleSelect.component";

@Component({
    selector: 'dynamic-form',
    template: require('./form.html'),
    styleUrls: [
        require('./form.scss'),
        require('./style.scss')
    ]
})

export class DynamicForm {
    @Input('btnName')
    public btnName: BtnTypes;

    @Input('crudService')
    public crudService: CrudService;

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
                this.crudService.createRecord(this.crudService.model, this.route.snapshot.params['className']);

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
    exports: [DynamicForm],
    declarations: [DynamicForm],
    providers: [
        CrudService
    ]
})
export class DynamicFormModule {
}
