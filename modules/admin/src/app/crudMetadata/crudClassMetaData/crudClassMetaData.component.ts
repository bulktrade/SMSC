import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'crudClassMetaData',
    template: '<loading-router-outlet></loading-router-outlet>',
    styleUrls: [],
    providers: []
})

export class CrudClassMetaData {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
