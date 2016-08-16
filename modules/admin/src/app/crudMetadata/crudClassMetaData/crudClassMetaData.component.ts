import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { LoadingRouterOutlet } from "../../common/loadingRouterOutlet";

@Component({
    selector: 'crudClassMetaData',
    template: '<loading-router-outlet></loading-router-outlet>',
    styles: [],
    providers: [],
    directives: [
        LoadingRouterOutlet
    ],
    pipes: [ TranslatePipe ]
})

export class CrudClassMetaData {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
