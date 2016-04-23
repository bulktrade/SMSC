import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'api',
    templateUrl: 'app/components/api/api.html',
    styles: [
        require('./api.scss'),
        require('../../../assets/css/theme/breadcrumb.scss'),
    ],
    providers: [],
    directives: [],
    pipes : [TranslatePipe]
})
export class API {

    constructor(public translate: TranslateService, public router: Router) {
    }

    ngOnInit() {

    }

}