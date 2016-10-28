import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'crudMetaGridData',
    template: `
        <breadcrumb></breadcrumb>
        <loading-router-outlet></loading-router-outlet>
`,
    styleUrls: [],
    providers: []
})

export class CrudMetaGridDataComponent {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
