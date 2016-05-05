import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'sidebar-item',
    template: '<ng-content></ng-content>',
    styles: [],
    providers: [],
    directives: [],
    pipes: [TranslatePipe]
})
export class SidebarItem {

    constructor(public translate: TranslateService, public router: Router) {
    }

    ngOnInit() {
    }

}
