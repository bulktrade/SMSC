import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import {FinancesMain} from '../financesmain/financesmain.component';
import {SystemSettings} from '../systemsettings/systemsettings.component';
import {AnimateBox} from '../sidebar/directives/animate';
import {ShowMiniNav} from '../sidebar/ShowMiniNav';
import {Dashboard} from '../dashboard/dashboard.component';
import {GSM} from '../gsm/gsm.component';
import {SidebarService} from '../sidebar/sidebar.service.component';

@Component({
    selector: 'navigation',
    providers: [ShowMiniNav],
    template: require('./navigation.html'),
    styleUrls: [
        require('./navigation.scss')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        NgClass,
        SidebarService,
        AnimateBox
    ],
    pipes: [TranslatePipe]
})

@RouteConfig([
    {
        path: '/dashboard/...', component: Dashboard, name: 'Dashboard',
        data: {
            showInSubNavigation: true,
            icon: 'layers',
            toggle: '/icnDsh'
        },
        useAsDefault: true
    },
    {
        path: '/gsm/...', component: GSM, name: 'GSM',
        data: {
            showInSubNavigation: true,
            icon: 'settings_remote',
            toggle: '/icnGsm'
        }
    },
    {
        path: '/financesmain',
        component: FinancesMain,
        name: 'FinancesMain',
        data: { showInSubNavigation: true, icon: 'edit' }
    },
    {
        path: '/systemsettings',
        component: SystemSettings,
        name: 'SystemSettings',
        data: { showInSubNavigation: true, icon: 'settings' }
    }
])

export class Navigation implements OnInit {
    content: string;

    constructor(public router: Router, public translate: TranslateService,
                public showmininav: ShowMiniNav) {
        this.content = localStorage.getItem('adminRight');
    }

    logout() {
        localStorage.removeItem('adminRight');
        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
        this.setDefaultLang();
    }

    setDefaultLang() {
        let userLang = navigator.language.split('-')[0];
        userLang = /(en|de)/gi.test(userLang) ? userLang : 'en';
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

}
