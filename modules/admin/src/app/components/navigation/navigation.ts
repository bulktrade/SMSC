import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, NgClass} from 'angular2/common';
import {LoggedInRouterOutlet} from '../authentication/LoggedInOutlet';
import {RouteConfig, Router} from 'angular2/router';
import {LocalStorage} from '../login/localstorage';
import {AnimateBox} from './directives/animate';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {SMSTraffic} from '../smstraffic/smstraffic';
import {DLRTraffic} from '../dlrtraffic/dlrtraffic';
import {Finances} from '../finances/finances';
import {Customers} from '../customers/customers';
import {Monitoring} from '../monitoring/monitoring';
import {Carriers} from '../carriers/carriers';
import {Routing} from '../routing/routing';
import {Prices} from '../prices/prices';
import {MCCMNC} from '../mccmnc/mccmnc';
import {SMPP} from '../smpp/smpp';
import {API} from '../api/api';
import {SystemSettings} from '../systemsettings/systemsettings';


@Component({
    selector: 'navigation',
    providers: [],
    templateUrl: 'app/components/navigation/navigation.html',
    styleUrls: ['../../assets/css/style.css'],
    directives: [LoggedInRouterOutlet, CORE_DIRECTIVES, AnimateBox, NgClass],
    pipes : [TranslatePipe]
})

@RouteConfig([
    { path: '/smstraffic', component: SMSTraffic, name: 'SMSTraffic', useAsDefault: true},
    { path: '/dlrtraffic', component: DLRTraffic, name: 'DLRTraffic'},
    { path: '/finances', component: Finances, name: 'Finances' },
    { path: '/customers', component: Customers, name: 'Customers'},
    { path: '/monitoring', component: Monitoring, name: 'Monitoring' },
    { path: '/carriers', component: Carriers, name: 'Carriers' },
    { path: '/routing', component: Routing, name: 'Routing' },
    { path: '/prices', component: Prices, name: 'Prices' },
    { path: '/mccmnc', component: MCCMNC, name: 'MCCMNC' },
    { path: '/smpp', component: SMPP, name: 'SMPP' },
    { path: '/api', component: API, name: 'API' },
    { path: '/systemsettings', component: SystemSettings, name: 'SystemSettings' },
])

export class Navigation implements OnInit {
    content: string;
    showNav: boolean = false;
    icnDsh: boolean = true;
    icnGsm: boolean = true;

    constructor(public router: Router, public translate: TranslateService) {
        this.content = LocalStorage.getLocalStorage();
    }

    onSelect(route) {
        this.router.navigate([route]);
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

    hasClass(element) {
        return (' ' + element.children[element.children.length-1].className + ' ').indexOf(' ' + 'sub-menu-item' + ' ') > -1;
    }

}