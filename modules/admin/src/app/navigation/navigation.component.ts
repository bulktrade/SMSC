import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import { NgClass } from "@angular/common";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { AnimateBox } from "../sidebar/directives/animate";
import { ShowMiniNav } from "../sidebar/ShowMiniNav";
import { Sidebar } from "../sidebar/sidebar.component";
import { MD_SIDENAV_DIRECTIVES } from "@angular2-material/sidenav/sidenav";
import { MdButton } from "@angular2-material/button/button";
import { Dir } from "@angular2-material/core/core";
import { MdIcon } from "@angular2-material/icon/icon";
import { MD_LIST_DIRECTIVES } from "@angular2-material/list/list";
import { MdToolbar } from "@angular2-material/toolbar/toolbar";
import { SidebarItem } from "../sidebar/sidebaritem.component";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

@Component({
    selector: 'navigation',
    providers: [ ShowMiniNav ],
    template: require('./navigation.html'),
    styles: [
        require('./navigation.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    directives: [
        ROUTER_DIRECTIVES,
        NgClass,
        Sidebar,
        AnimateBox,
        MD_SIDENAV_DIRECTIVES,
        MdButton,
        Dir,
        MdIcon,
        MD_LIST_DIRECTIVES,
        MdToolbar,
        SidebarItem
    ],
    pipes: [ TranslatePipe ]
})

export class Navigation implements OnInit {
    content:string;
    username:string;

    constructor(public router:Router,
                public translate:TranslateService,
                public showmininav:ShowMiniNav) {
        this.content = localStorage.getItem('adminRight');
        this.username = 'admin';
    }

    logout() {
        localStorage.removeItem('adminRight');
        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
    }
}
