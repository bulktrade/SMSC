import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    selector: 'notfound',
    templateUrl: 'app/notfound/notfound.html',
    styleUrls: [
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
