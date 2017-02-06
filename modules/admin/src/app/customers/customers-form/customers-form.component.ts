import { Component, Input, NgModule, ModuleWithProviders, Output, EventEmitter } from "@angular/core";
import { Location, CommonModule } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateModule } from "ng2-translate/ng2-translate";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/components/button/button";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { OneToManyModule } from "../../common/components/one-to-many/one-to-many.component";
import { ControlErrorsModule } from "../../common/components/control-errors/control-errors";
import { PanelModule } from "primeng/components/panel/panel";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { OneToOneModule } from "../../common/components/one-to-one/one-to-one.component";
import { CustomersService } from "../customers.service";

@Component({
    selector: 'dynamic-form',
    template: require('./customers-form.component.html'),
    styleUrls: ['customers-form.component.scss']
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
                public location: Location,
                public customersService: CustomersService) {
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
        OneToManyModule,
        TranslateModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ControlErrorsModule,
        OneToOneModule
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
