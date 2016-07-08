import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.component.ts';

require('./financesmain.scss');

@Component({
    selector: 'finances-main',
    template: require('./financesmain.html'),
    styleUrls: [],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService],
    pipes: [TranslatePipe]
})
export class FinancesMain {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {
    }

    ngOnInit() {
    }

}
