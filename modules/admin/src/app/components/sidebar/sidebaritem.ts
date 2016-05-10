import {Component, Input} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'sidebar-item',
    template: '<ng-content></ng-content>',
    styles: [],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SidebarItem {
    @Input() showNav:boolean;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }

}
