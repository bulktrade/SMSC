import {Component} from "@angular/core";
import {TranslatePipe, TranslateService} from "ng2-translate/ng2-translate";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {CustomersCrud} from "../crud/crud";

@Component({
    selector: 'customers',
    template: require('./customers.html'),
    styleUrls: [
        require('./customers.scss')
    ],
    providers: [],
    directives: [
        ROUTER_DIRECTIVES,
        CustomersCrud
    ],
    pipes: [TranslatePipe]
})

export class Customer {
    constructor(public translate:TranslateService) {
    }

    ngOnInit() {
    }
}
