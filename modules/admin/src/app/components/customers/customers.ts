import {Component} from 'angular2/core';
import {CustomersGrid} from './directives/customers-grid';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
    selector: 'customers',
    templateUrl: 'app/components/customers/customers.html',
    styles: [
        require('./customers.scss')
    ],
    providers: [BreadcrumbService],
    directives: [CustomersGrid, BreadcrumbService],
    pipes : [TranslatePipe]
})
export class Customers {

    constructor(public translate: TranslateService, public router: Router,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {

    }

}