import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'smpp',
    templateUrl: 'app/components/smpp/smpp.html',
    styles: [
        require('./smpp.scss')
    ],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService],
    pipes: [TranslatePipe]
})
export class SMPP {

    constructor(public translate: TranslateService, public router: Router,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }

}