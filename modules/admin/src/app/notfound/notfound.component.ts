import { Component, ViewEncapsulation } from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

require('./notfound.scss')

@Component({
    selector: 'notfound',
    template: require('./notfound.html'),
    styleUrls: [],
    encapsulation: ViewEncapsulation.None,
    providers: [],
    directives: [ROUTER_DIRECTIVES],
    pipes: []
})
export class NotFound {
    constructor() {
    }

    ngOnInit() {
    }
}
