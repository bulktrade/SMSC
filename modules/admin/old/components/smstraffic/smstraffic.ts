import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'smstraffic',
    templateUrl: 'app/components/smstraffic/smstraffic.html',
    styles: [
        require('./smstraffic.scss')
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