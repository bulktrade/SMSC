import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'api',
    templateUrl: 'app/gsm/api/api.html',
    styles: [
        require('./api.scss')
    ],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService],
    pipes : [TranslatePipe]
})
export class API {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {
    }

    ngOnInit() {
    }

}
