import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

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