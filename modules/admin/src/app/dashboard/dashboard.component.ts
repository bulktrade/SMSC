import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'dashboard',
    providers: [Breadcrumb],
    template: require('./dashboard.html'),
    styleUrls: [
        require('./dashboard.scss')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        CORE_DIRECTIVES,
        Breadcrumb
    ],
    pipes: [TranslatePipe]
})

export class Dashboard {

    constructor(public translate:TranslateService,
                public breadcrumb:Breadcrumb) {
    }

}
