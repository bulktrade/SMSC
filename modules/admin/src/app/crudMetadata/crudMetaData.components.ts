import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import {LoadingRouterOutlet} from "../common/loadingRouterOutlet";

@Component({
    selector: 'crud-metadata',
    template: require('./crudMetaData.html'),
    styles: [
        require('./crudMetaData.scss')
    ],
    providers: [Breadcrumb],
    directives: [
        LoadingRouterOutlet,
        Breadcrumb
    ],
    pipes: [TranslatePipe]
})

export class CrudMetaData {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
