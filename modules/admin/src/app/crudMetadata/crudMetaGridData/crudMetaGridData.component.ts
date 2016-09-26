import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'crudMetaGridData',
    template: '<loading-router-outlet></loading-router-outlet>',
    styleUrls: [],
    providers: []
})

export class CrudMetaGridData {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
