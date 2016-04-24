import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Router} from 'angular2/router';
import {Breadcrumb} from '../breadcrumb/breadcrumb';

@Component({
	selector: 'finances',
	templateUrl: 'app/components/finances/finances.html',
	styles: [
		require('./finances.scss')
	],
	providers: [],
	directives: [Breadcrumb],
	pipes: [TranslatePipe]
})
export class Finances {

	constructor(public translate:TranslateService, public router:Router) {
	}

	ngOnInit() {

	}

}