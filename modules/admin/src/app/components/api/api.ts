import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'api',
    templateUrl: 'app/components/api/api.html',
    styles: [
        require('./api.scss')
    ],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService],
    pipes : [TranslatePipe]
})
export class API {

    constructor(public translate: TranslateService, public router: Router, 
                public breadcrumb: BreadcrumbService) {
    }

    ngOnInit() {
    }

}