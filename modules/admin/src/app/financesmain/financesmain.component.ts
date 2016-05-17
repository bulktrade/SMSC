import {Component} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {BreadcrumbService} from '../breadcrumb/breadcrumb.component.ts';

@Component({
	selector: 'finances-main',
	templateUrl: 'app/financesmain/financesmain.html',
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