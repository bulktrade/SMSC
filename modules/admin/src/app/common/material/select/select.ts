import { Component, Input, Output, NgModule, ModuleWithProviders } from "@angular/core";
import { EventEmitter } from "@angular/common/src/facade/async";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'md-select',
    providers: [],
    template: require('./select.html'),
    styleUrls: [
        require('./select.scss'),
    ]
})

export class MdSelect {
    @Input('options') public options;
    @Input('placeholder') public placeholder;

    @Input() public model;
    @Output() public modelChange = new EventEmitter();

    onChange(event) {
        this.modelChange.emit(event.target.value);
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
