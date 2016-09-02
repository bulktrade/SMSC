import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";

@Component({
    selector: 'crudMetaFormData',
    template: '<loading-router-outlet></loading-router-outlet>',
    styles: [],
    providers: []
})

export class CrudMetaFormData {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
