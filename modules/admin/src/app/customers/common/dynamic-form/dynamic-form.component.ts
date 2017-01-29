import { Component, Input, NgModule, ModuleWithProviders, Output, EventEmitter } from "@angular/core";
import { Location, CommonModule } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateModule } from "ng2-translate/ng2-translate";
import { FormsModule } from "@angular/forms";
import { PanelModule } from "primeng/components/panel/panel";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { ButtonModule } from "primeng/components/button/button";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { MultipleSelectModule } from "../../../crud/directives/multiple-select/multiple-select.component";
import { ControlErrorsModule } from "../../../common/control-errors/control-errors";

@Component({
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styleUrls: ['./dynamic-form.component.scss']
})

export class DynamicFormComponent {
    @Input('submitButtonName')
    public submitButtonName: string;

    @Input('model')
    public model = {};

    @Output('onSubmit')
    public _onSubmit = new EventEmitter();

    constructor(public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this._onSubmit.emit(this.model);
    }

    back() {
        this.location.back();
    }

    onAdd(event) {
    }
}

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        FormsModule,
        TranslateModule,
        MultipleSelectModule.forRoot(),
        TranslateModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ControlErrorsModule
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
