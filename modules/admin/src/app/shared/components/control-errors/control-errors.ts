import {Component, Host, Input, Optional, NgModule, ModuleWithProviders} from "@angular/core";
import {NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "ng2-translate";

@Component({
    selector: 'control-errors',
    template: `
        <div class="ui-message ui-messages-error ui-corner-all" *ngIf="error">
            <i class="fa fa-close"></i>
            {{ error | translate }}
        </div>
    `
})
export class ControlErrorsComponent {

    @Input() control: string;
    @Input() errors: Object;

    private _error: string;

    constructor(@Optional() @Host() private form: NgForm) {
        if (!this.form) {
            throw new Error('control-errors must be used with a parent formGroup directive');
        }
    }

    get error() {
        const control = this.form.controls[this.control];
        if (control && control.dirty) {
            for (let key in control.errors) {
                if (this.errors[key] !== undefined) {
                    return this.errors[key];
                } else {
                    return control.errors[key];
                }
            }
        }
    }

}

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [ControlErrorsComponent],
    declarations: [ControlErrorsComponent]
})
export class ControlErrorsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ControlErrorsModule,
            providers: []
        };
    }
}
