import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    selector: 'notfound',
    template: require('./notfound.html'),
    styles: [
        require('./notfound.scss')
    ],
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
