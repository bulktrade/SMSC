import {Component} from '@angular/core';
import {CustomersGrid} from './directives/customers-grid';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [
        // require('./customers.scss')
    ],
    providers: [BreadcrumbService],
    directives: [CustomersGrid, BreadcrumbService],
    pipes : [TranslatePipe]
})
export class Customers {

    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

}
