import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
    providers: [BreadcrumbComponent],
    selector: 'customers',
    template: require('./customers.component.html'),
    styleUrls: [
        require('./customers.component.scss')
    ]
})

export class CustomersComponent {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
