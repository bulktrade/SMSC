import { Component } from "@angular/core";
import { TranslatePipe } from "ng2-translate/ng2-translate";
import { CORE_DIRECTIVES } from "@angular/common";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";
import { LoadingRouterOutlet } from "../common/loadingRouterOutlet";

@Component({
    selector: 'dashboard',
    providers: [Breadcrumb],
    template: '<loading-router-outlet></loading-router-outlet>',
    directives: [
        LoadingRouterOutlet,
        ROUTER_DIRECTIVES,
        CORE_DIRECTIVES,
        Breadcrumb
    ],
    pipes: [TranslatePipe],
})
export class Dashboards {
    constructor() {
    }
}
