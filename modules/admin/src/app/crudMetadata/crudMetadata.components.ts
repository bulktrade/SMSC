import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import {LoadingRouterOutlet} from "../common/loadingRouterOutlet";

@Component({
    selector: 'crud-metadata',
    template: require('./crudMetadata.html'),
    styles: [
        require('./crudMetadata.scss')
    ],
    providers: [Breadcrumb],
    directives: [
        LoadingRouterOutlet,
        Breadcrumb
    ],
    pipes: [TranslatePipe]
})

export class CrudMetadata {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
