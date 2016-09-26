import { Component, Input, Output, NgModule, ModuleWithProviders, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/common/src/facade/async';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'md-select',
    providers: [],
    template: require('./select.html'),
    styleUrls: [
        require('./select.scss'),
    ]
})

export class MdSelect implements OnInit {
    @Input('options') public options;
    @Input('placeholder') public placeholder: string;
    @Input('required') public required: boolean;
    @Input('model') public model;

    @Output('modelChange') public modelChange = new EventEmitter();
    @Output('valid') public valid = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
        this.checkOnValid(this.model);
    }

    onChange(event) {
        this.checkOnValid(event.target.value);
        this.modelChange.emit(event.target.value);
    }

    checkOnValid(value): void {
        if (!Array.isArray(value) && this.required) {
            this.valid.emit(false);
        } else if (Array.isArray(value) && this.required) {
            if (value.length) {
                this.valid.emit(false);
            } else {
                this.valid.emit(true);
            }
        } else {
            this.valid.emit(false);
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [MdSelect],
    declarations: [MdSelect]
})
export class MdSelectModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MdSelectModule,
            providers: []
        };
    }
}
