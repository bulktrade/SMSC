import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {LocalStorage} from '../../../assets/js/angular2-localstorage/WebStorage';

import {SystemSettings} from '../systemsettings/systemsettings';
import {Dashboard} from "../dashboard/dashboard";
import {GSM} from '../gsm/gsm';
import {FinancesMain} from '../financesmain/financesmain';
import {Sidebar} from '../sidebar/sidebar';
import {AnimateBox} from '../sidebar/directives/animate';

@Component({
    selector: 'navigation',
    providers: [],
    templateUrl: 'app/components/navigation/navigation.html',
    styles: [
        require('../../../assets/css/style.scss')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        NgClass,
        Sidebar,
        AnimateBox
    ],
    pipes: [TranslatePipe]
})

@RouteConfig([
    {path: '/dashboard/...', component: Dashboard, name: 'Dashboard', useAsDefault: true},
    {path: '/gsm/...', component: GSM, name: 'GSM'},
    {path: '/financesmain', component: FinancesMain, name: 'FinancesMain'},
    {path: '/systemsettings', component: SystemSettings, name: 'SystemSettings'},
])

export class Navigation implements OnInit {
    @LocalStorage()
    public showNav:boolean;

    content:string;

    constructor(public router:Router, public translate:TranslateService) {
        this.content = localStorage.getItem('rightWrite');
    }

    logout() {
        localStorage.removeItem('rightWrite');
        this.router.parent.navigate(['Login']);
    }

    ngOnInit() {
        this.setDefaultLang();
    }

    setDefaultLang() {
        // let userLang = navigator.language.split('-')[0];
        // userLang = /(en|de)/gi.test(userLang) ? userLang : 'en';
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

}