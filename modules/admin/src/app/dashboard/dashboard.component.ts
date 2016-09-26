import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';

@Component({
    selector: 'dashboard',
    providers: [Breadcrumb],
    template: require('./dashboard.html'),
    styleUrls: [
        require('./dashboard.scss')
    ]
})

export class Dashboard {

    constructor(public translate: TranslateService,
                public breadcrumb: Breadcrumb) {
    }

}
