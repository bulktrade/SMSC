import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'carriers',
    templateUrl: 'app/components/carriers/carriers.html',
    styles: [
        require('./carriers.scss')
    ],
    providers: [BreadcrumbService],
    directives: [BreadcrumbService],
    pipes: [TranslatePipe]
})
export class Carriers {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

}