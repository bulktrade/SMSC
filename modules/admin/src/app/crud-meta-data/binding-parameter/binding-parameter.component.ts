import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'binding-parameter',
    template: `
        <breadcrumb></breadcrumb>
        <loading-router-outlet></loading-router-outlet>
`,
    styleUrls: [],
    providers: []
})

export class MetaDataPropertyBindingParameterComponent {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
