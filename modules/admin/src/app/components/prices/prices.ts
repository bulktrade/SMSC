import {Component} from 'angular2/core';
import {PricesGrid} from './directives/prices-grid';

@Component({
    selector: 'prices',
    templateUrl: 'app/components/prices/prices.html',
    styleUrls: ['app/components/prices/prices.css'],
    providers: [],
    directives: [PricesGrid],
    pipes: []
})
export class Prices {
    constructor() {}

    ngOnInit() {
        
    }
}