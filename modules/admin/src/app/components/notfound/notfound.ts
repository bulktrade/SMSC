import {Component, ViewEncapsulation} from 'angular2/core';
import {Router} from "angular2/router";

@Component({
    selector: 'notfound',
    templateUrl: 'app/components/notfound/notfound.html',
    styles: [
        require('./notfound.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [],
    directives: [],
    pipes: []
})

export class NotFound {

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

}