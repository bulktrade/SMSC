import {Directive} from 'angular2/core';
import {Router} from 'angular2/router';

@Directive({
	selector: '[active-item]',
	exportAs: 'active'
})
export class ActiveItem {
	constructor(public router:Router) {
	}

	private dashboardMenu = [
		'SMSTraffic',
		'DLRTraffic',
		'Finances',
		'Customers'
	];

	private GSMMenu = [
		'Monitoring',
		'Carriers',
		'Routing',
		'Prices',
		'MCCMNC',
		'SMPP',
		'API'
	];

	isActiveMainDashboard() {
		for (let item in this.dashboardMenu) {
			if (this.router.isRouteActive(this.router.parent.generate(['./Navigation',
					this.dashboardMenu[item]]))) {
				return true;
			}
		}

		return false;
	}

	isActiveMainGSM() {
		for (let item in this.GSMMenu) {
			if (this.router.isRouteActive(this.router.generate([this.GSMMenu[item]]))) {
				return true;
			}
		}

		return false;
	}

	isActiveItem(title) {
		return this.router.isRouteActive(this.router.generate([title]));
	}

}