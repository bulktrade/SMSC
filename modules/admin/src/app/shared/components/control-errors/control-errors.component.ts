import {Component, Host, Input, Optional, NgModule, OnInit} from "@angular/core";
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
export class ControlErrorsComponent implements OnInit {
    @Input() control: string;

    @Input() errors: Object;

    private _error: string;

    constructor(@Optional() @Host() public form: NgForm) {
    }

    ngOnInit() {
        if (!this.form) {
            throw new Error('control-errors must be used with a parent formGroup directive');
        }
    }

    findFirst() {
        const control = this.form.controls[this.control];

        if (control && control.dirty) {
            let firstError: string = null;

            Object.keys(this.errors).some(err => {
                if (control.hasError(err)) {
                    firstError = this.errors[err];
                    return true;
                }
            });

            return firstError;
        }
    }

    get error() {
        this._error = this.findFirst();
        return this._error;
    }

    set error(value: string) {
        this._error = value;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ControlErrorsComponent],
    declarations: [ControlErrorsComponent]
})
export class ControlErrorsModule {
}
