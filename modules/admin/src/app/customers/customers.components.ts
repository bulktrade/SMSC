import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {ROUTER_DIRECTIVES} from "@angular/router";

require('./customers.scss');

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [],
    providers: [],
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class Customers {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
