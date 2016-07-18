import { Component, ViewEncapsulation } from '@angular/core';

require('./notFound.scss');

@Component({
    selector: 'notFound',
    template: require('./notFound.html'),
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
