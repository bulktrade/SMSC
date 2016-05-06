import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'notfound',
	templateUrl: 'app/components/notfound/notfound.html',
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