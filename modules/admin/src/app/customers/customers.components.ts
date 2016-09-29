import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';

@Component({
    providers: [Breadcrumb],
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [
        require('./customers.scss')
    ]
})

export class Customers {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
