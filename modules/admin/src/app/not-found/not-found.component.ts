import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'notFound',
    template: require('./not-found.component.html'),
    styleUrls: ['./not-found.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class NotFoundComponent {
    constructor() {
    }

    ngOnInit() {
    }
}
