import { Component, Input, NgModule, ModuleWithProviders, Output, EventEmitter } from "@angular/core";
import { CrudService } from "../crud.service";
import { Location, CommonModule } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { MdSelectModule } from "../../common/material/select/select.component";
import { TranslateModule } from "ng2-translate/ng2-translate";
import { FormsModule } from "@angular/forms";
import { LoadingGridModule } from "../../common/loading-grid.component";
import { MultipleSelectModule } from "../directives/multiple-select/multiple-select.component";
import { PanelModule } from "primeng/components/panel/panel";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { ButtonModule } from "primeng/components/button/button";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { ColumnDef } from "../model/column-definition";
import { CrudLevel } from "../model/crud-level";
import { LinkedProperty } from "../model/linkset-property";
import { CrudLevelService } from "../services/crud-level";

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
    public columnDefs: ColumnDef[];

    @Input('model')
    public model = {};

    @Output('onSubmit')
    public _onSubmit = new EventEmitter();

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location,
                public crudService: CrudService,
                public crudLevelService: CrudLevelService) {
    }

    ngOnInit() {
        // generate the 'options' property for the dropdown UI component
        this.columnDefs.forEach(i => {
            if (i.type.includes(',')) {
                i.options = this.crudService.generateOptionsForDropdown(i.type);
            }
        });

        // set form model
        if (this.crudLevelService.currentCrudLevel) {
            this.model = this.crudLevelService.currentCrudLevel.formModel;
        }
    }

    onSubmit() {
        this._onSubmit.emit(this.model);
    }

    ngOnDestroy() {
        this.crudService.multipleSelectValid = false;
        this.crudService.setModel({});
    }

    back() {
        // reset all crud levels if the crudLevels is empty
        if (this.crudLevelService.isEmptyCrudLevels()) {
            this.crudLevelService.resetCrudLevels();
        }

        this.location.back();
    }

    onAdd(event) {
        let crudLevel: CrudLevel = <CrudLevel>{
            formModel: this.model,
            linkedProperty: <LinkedProperty>{
                crudEntity: this.crudService.getClassName(),
                crudRepository: this.crudService.getRepositoryName()
            }
        };

        this.crudLevelService.nextCrudLevel(crudLevel);

        // set crud class name
        this.crudService.setClassName(event.linkedClass);

        // set crud repository name
        this.crudService.setRepositoryName(event.linkedRepository);

        this.router.navigate([this.crudService.getCrudRootPath()]);
    }
}

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        FormsModule,
        TranslateModule,
        LoadingGridModule,
        MdSelectModule.forRoot(),
        MultipleSelectModule.forRoot(),
        TranslateModule,
        LoadingGridModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        DropdownModule
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
