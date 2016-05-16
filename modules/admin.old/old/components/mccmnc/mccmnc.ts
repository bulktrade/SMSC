import {Component} from '@angular/core';
import {MCCMNCGrid} from './directives/mccmnc-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'mccmnc',
    templateUrl: 'app/components/mccmnc/mccmnc.html',
    styles: [
        require('./mccmnc.scss')
    ],
    providers: [BreadcrumbService],
    directives: [MCCMNCGrid, BreadcrumbService],
    pipes: [TranslatePipe]
})
export class MCCMNC {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

}