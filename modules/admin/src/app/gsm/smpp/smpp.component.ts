import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'smpp',
    template: require('./smpp.html'),
    styles: [
        require('./smpp.scss')
    ],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService],
    pipes: [TranslatePipe]
})
export class SMPP {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }

}
