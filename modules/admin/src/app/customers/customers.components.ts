import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import {LoadingRouterOutlet} from "../common/loadingRouterOutlet";

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styles: [
        require('./customers.scss')
    ],
    providers: [Breadcrumb],
    directives: [
        LoadingRouterOutlet,
        Breadcrumb
    ],
    pipes: [TranslatePipe]
})

export class Customers {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
