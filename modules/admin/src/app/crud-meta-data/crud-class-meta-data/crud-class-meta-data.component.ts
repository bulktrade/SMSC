import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'crudClassMetaData',
    template: `
        <breadcrumb></breadcrumb>
        <loading-router-outlet></loading-router-outlet>
`,
    styleUrls: [],
    providers: []
})

export class CrudClassMetaDataComponent {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
