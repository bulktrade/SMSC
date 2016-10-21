import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'notFound',
    template: require('./notFound.component.html'),
    styleUrls: [
        require('./notFound.component.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class NotFoundComponent {
    constructor() {
    }

    ngOnInit() {
    }
}
