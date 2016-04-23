import {Component} from 'angular2/core';
import {CustomersGrid} from './directives/customers-grid';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'customers',
    templateUrl: 'app/components/customers/customers.html',
    styles: [
        require('./customers.scss'),
        require('../../../assets/css/theme/breadcrumb.scss'),
    ],
    providers: [],
    directives: [CustomersGrid],
    pipes : [TranslatePipe]
})
export class Customers {

    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {

    }

}