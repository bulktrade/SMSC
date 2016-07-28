import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Breadcrumb } from "../breadcrumb/breadcrumb.component";

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styles: [
        require('./customers.scss')
    ],
    providers: [Breadcrumb],
    directives: [
        ROUTER_DIRECTIVES,
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
