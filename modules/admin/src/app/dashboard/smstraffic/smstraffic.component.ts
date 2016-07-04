import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'smstraffic',
    template: require('./smstraffic.html'),
    styleUrls: [
        // require('./smstraffic.scss')
    ],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService],
    pipes: [TranslatePipe]
})
export class SMSTraffic {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

}
