import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.service';

@Component({
	selector: 'finances-main',
	templateUrl: 'app/components/financesmain/financesmain.html',
	styles: [
		require('./financesmain.scss')
	],
	providers: [BreadcrumbService],
	directives: [BreadcrumbService],
	pipes: [TranslatePipe]
})
export class FinancesMain {

	constructor(public translate:TranslateService,
				public breadcrumb: BreadcrumbService) {
	}

	ngOnInit() {
	}

}