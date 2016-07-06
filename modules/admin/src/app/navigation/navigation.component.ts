import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import {AnimateBox} from '../sidebar/directives/animate';
import {ShowMiniNav} from '../sidebar/ShowMiniNav';
import {SidebarService} from '../sidebar/sidebar.service.component';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav/sidenav';
import {MdButton} from '@angular2-material/button/button';
import {Dir} from '@angular2-material/core/core';
import {MdIcon} from '@angular2-material/icon/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {SidebarItem} from "../sidebar/sidebaritem.component";

@Component({
    selector: 'navigation',
    providers: [ShowMiniNav],
    template: require('./navigation.html'),
    styleUrls: [
        require('./navigation.scss').toString()
    ],
    directives: [
        ROUTER_DIRECTIVES,
        NgClass,
        SidebarService,
        AnimateBox,
        MD_SIDENAV_DIRECTIVES,
        MdButton,
        Dir,
        MdIcon,
        MD_LIST_DIRECTIVES,
        MdToolbar,
        SidebarItem
    ],
    pipes: [TranslatePipe]
})

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
