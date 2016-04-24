import {Component} from 'angular2/core';
import {PricesGrid} from './directives/prices-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {Breadcrumb} from '../breadcrumb/breadcrumb';

@Component({
    selector: 'prices',
    templateUrl: 'app/components/prices/prices.html',
    styles: [
        require('./prices.scss')
    ],
    providers: [],
    directives: [PricesGrid, Breadcrumb],
    pipes: [TranslatePipe]
})
export class Prices {
    constructor(public translate: TranslateService, public router: Router) {}

    ngOnInit() {
        
    }
}