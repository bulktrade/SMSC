import {Component} from 'angular2/core';
import {PricesGrid} from './directives/prices-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';

@Component({
    selector: 'prices',
    templateUrl: 'app/components/prices/prices.html',
    styleUrls: [
        'app/components/prices/prices.css',
        'assets/css/theme/breadcrumb.css'
    ],
    providers: [],
    directives: [PricesGrid],
    pipes: [TranslatePipe]
})
export class Prices {
    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {
        
    }
}