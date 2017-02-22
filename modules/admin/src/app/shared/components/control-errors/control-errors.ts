import {Component, Host, Input, Optional, NgModule, ModuleWithProviders} from "@angular/core";
import {NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'control-errors',
    template: `
        <div class="ui-message ui-messages-error ui-corner-all" *ngIf="error">
            <i class="fa fa-close"></i>
            {{ error }}
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
            let firstError;

            Object.keys(this.errors).some(err => {
                if (control.hasError(err)) {
                    firstError = this.errors[err];
                    return true;
                }
            });

            return firstError;
        }
    }

}

@NgModule({
    imports: [CommonModule],
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
