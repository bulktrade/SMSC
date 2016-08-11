import {Component, OnInit, NgModule} from "@angular/core";
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
import {ROUTER_DIRECTIVES, Router, RouterOutlet} from "@angular/router";
import { TokenService } from "../services/auth/token.service";
import {CubeGridComponent} from "../common/spinner/cubeGrid/cubeGrid.component";
import {LoadingRouterOutlet} from "../common/loadingRouterOutlet";
import {LoadingService} from "../services/loading.service";

@Component({
    selector: 'navigation',
    providers: [ShowMiniNav],
    template: require('./navigation.html'),
    styles: [
        require('./navigation.scss')
    ],
    directives: [
        Sidebar,
        CubeGridComponent
    ],
    pipes: [TranslatePipe]
})

export class Navigation implements OnInit {
    constructor(public router:Router,
                public translate:TranslateService,
                public showmininav:ShowMiniNav,
                public tokenService:TokenService,
                public loadingService:LoadingService) {
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
    }
}
