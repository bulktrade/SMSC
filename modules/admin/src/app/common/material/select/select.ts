import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/common/src/facade/async";

@Component({
    selector: 'md-select',
    providers: [],
    template: require('./select.html'),
    styles: [
        require('./select.scss'),
    ],
    directives: []
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
