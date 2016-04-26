import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, NgClass} from 'angular2/common';
import {LoggedInRouterOutlet} from '../authentication/LoggedInOutlet';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {LocalStorage} from '../login/localstorage';
import {AnimateBox} from './directives/animate';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {SystemSettings} from '../systemsettings/systemsettings';
import {ActiveItem} from './directives/active';
import {FaAngleLeft} from './directives/FaAngleLeft';
import {Dashboard} from "../dashboard/dashboard";
import {GSM} from '../gsm/gsm';
import {FinancesMain} from '../financesmain/financesmain';


@Component({
	selector: 'navigation',
	providers: [],
	templateUrl: 'app/components/navigation/navigation.html',
	styles: [
		require('../../../assets/css/style.scss')
	],
	directives: [ROUTER_DIRECTIVES,
		AnimateBox, NgClass, ActiveItem, FaAngleLeft],
	pipes: [TranslatePipe]
})

@RouteConfig([
	{path: '/dashboard/...', component: Dashboard, name: 'Dashboard', useAsDefault: true},
	{path: '/gsm/...', component: GSM, name: 'GSM'},
	{path: '/financesmain', component: FinancesMain, name: 'FinancesMain'},
	{path: '/systemsettings', component: SystemSettings, name: 'SystemSettings'},
])

export class Navigation implements OnInit {
	content:string;
	showNav:boolean = false;
	icnDsh:boolean = true;
	icnGsm:boolean = true;

	constructor(public router:Router, public translate:TranslateService) {
		this.content = LocalStorage.getLocalStorage();
	}

	logout() {
		localStorage.removeItem("rightWrite");
		this.router.parent.navigate(['Login']);
	}

	ngOnInit() {
		this.setDefaultLang();
		this.initLocalStore();
	}

	ngOnDestroy() {
		localStorage.removeItem('showNav');
		localStorage.removeItem('icnDsh');
		localStorage.removeItem('icnGsm');
	}

	setDefaultLang() {
		// let userLang = navigator.language.split('-')[0];
		// userLang = /(en|de)/gi.test(userLang) ? userLang : 'en';
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}

	initLocalStore() {
		// save state navigation in local store
		if (!localStorage.getItem('showNav')) {
			localStorage.setItem('showNav', 'false');
			localStorage.setItem('icnDsh', 'true');
			localStorage.setItem('icnGsm', 'true');
		} else {
			this.showNav = this.toBoolean(localStorage.getItem('showNav'));
			this.icnDsh = this.toBoolean(localStorage.getItem('icnDsh'));
			this.icnGsm = this.toBoolean(localStorage.getItem('icnGsm'));
		}
	}

	saveStateNav() {
		localStorage.setItem('showNav', !this.toBoolean(localStorage.getItem('showNav')) + "");
		this.showNav = this.toBoolean(localStorage.getItem('showNav'));
	}

	saveStateDash() {
		localStorage.setItem('icnDsh', !this.toBoolean(localStorage.getItem('icnDsh')) + "");
		this.icnDsh = this.toBoolean(localStorage.getItem('icnDsh'));
	}

	saveStateGsm() {
		localStorage.setItem('icnGsm', !this.toBoolean(localStorage.getItem('icnGsm')) + "");
		this.icnGsm = this.toBoolean(localStorage.getItem('icnGsm'));
	}

	toBoolean(str) {
		return str === 'true' ? true : false;
	}

}