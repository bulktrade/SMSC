import {Component} from '@angular/core';
import {PricesGrid} from './directives/prices-grid';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../../breadcrumb/breadcrumb.component';

@Component({
    selector: 'prices',
    template: require('./prices.html'),
    styleUrls: [
        require('./prices.scss')
    ],
    providers: [BreadcrumbService],
    directives: [PricesGrid, BreadcrumbService],
    pipes: [TranslatePipe]
})
export class Prices {
    constructor(public translate: TranslateService,
                public breadcrumb: BreadcrumbService) {}

    ngOnInit() {
    }
}
