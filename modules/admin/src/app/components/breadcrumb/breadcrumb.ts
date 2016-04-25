import {Component} from 'angular2/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
    selector: 'breadcrumb',
    templateUrl: 'app/components/breadcrumb/breadcrumb.html',
    styles: [
        require('./breadcrumb.scss')
    ],
    inputs: [
        'title',
        'description',
        'parents'
    ],
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class Breadcrumb {

    constructor(public translate:TranslateService, public router:Router) {
    }

    ngOnInit() {
    }
}