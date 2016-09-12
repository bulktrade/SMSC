import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'notFound',
    template: require('./notFound.html'),
    styleUrls: [
        require('./notFound.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class NotFound {
    constructor() {
    }

    ngOnInit() {
    }
}
