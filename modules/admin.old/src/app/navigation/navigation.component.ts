import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

import { SystemSettings } from '../systemsettings/systemsettings.component';
import { Dashboard } from '../dashboard/dashboard.component';
import { GSM } from '../gsm/gsm.component';
import { FinancesMain } from '../financesmain/financesmain.component';
import { SidebarService } from '../sidebar/sidebar.service.component.ts';
import { AnimateBox } from '../sidebar/directives/animate';
import { ShowMiniNav } from '../sidebar/ShowMiniNav';

@Component({
    selector: 'navigation',
    providers: [ShowMiniNav, Router],
    templateUrl: 'app/components/navigation/navigation.html',
    styles: [
        require('../../../assets/css/style.scss')
    ],
    directives: [
        ROUTER_DIRECTIVES,
        NgClass,
        SidebarService,
        AnimateBox
    ],
    pipes: [TranslatePipe]
})

@Routes([
    {
        path: '/dashboard/...', component: Dashboard, name: 'Dashboard',
        data: {
            showInSubNavigation: true,
            icon: 'icon-bulb',
            'fa-angle': '/icnDsh'
        }, 
        useAsDefault: true
    },
    { path: '/gsm/...', component: GSM, name: 'GSM', data: { showInSubNavigation: true, icon: 'icon-settings' } },
    {
        path: '/financesmain',
        component: FinancesMain,
        name: 'FinancesMain',
        data: { showInSubNavigation: true, icon: 'icon-wallet' }
    },
    {
        path: '/systemsettings',
        component: SystemSettings,
        name: 'SystemSettings',
        data: { showInSubNavigation: true, icon: 'icon-settings' }
    }
])

export class Navigation implements OnInit {
    content: string;

    constructor(public router: Router, public translate: TranslateService, public showmininav: ShowMiniNav) {
        this.content = localStorage.getItem('rightWrite');
    }

    logout() {
        localStorage.removeItem('rightWrite');
        this.router.navigateByUrl('/login');
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
