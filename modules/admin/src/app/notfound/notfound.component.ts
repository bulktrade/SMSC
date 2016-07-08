import { Component, ViewEncapsulation } from '@angular/core';

require('./notfound.scss')

@Component({
    selector: 'notfound',
    template: require('./notfound.html'),
    styleUrls: [],
    encapsulation: ViewEncapsulation.None,
    providers: [],
    directives: [],
    pipes: []
})
export class NotFound {
    constructor() {
    }

    ngOnInit() {
    }
}
