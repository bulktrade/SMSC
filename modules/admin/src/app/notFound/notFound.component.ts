import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'notFound',
    template: require('./notFound.html'),
    styles: [
        require('./notFound.scss')
    ],
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
