import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'binding-parameter',
    template: '<loading-router-outlet></loading-router-outlet>',
    styleUrls: [],
    providers: []
})

export class MetaDataPropertyBindingParameter {
    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }
}
