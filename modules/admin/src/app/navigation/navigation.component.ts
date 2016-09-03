import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { ShowMiniNav } from "../sidebar/ShowMiniNav";
import { Sidebar } from "../sidebar/sidebar.component";
import { Router } from "@angular/router";
import { TokenService } from "../services/auth/token.service";
import { LoadingRouterOutlet } from "../common/loadingRouterOutlet";
import { NOTIFICATION_OPTIONS } from "../common/notificationOptions";
import { MdSidenav } from "@angular2-material/sidenav";
import { SidebarService } from "../sidebar/sidebarService";

@Component({
    selector: 'navigation',
    providers: [ShowMiniNav],
    template: require('./navigation.html'),
    styles: [
        require('./navigation.scss')
    ],
    directives: [
        LoadingRouterOutlet,
        Sidebar
    ],
    pipes: [TranslatePipe]
})

export class Navigation implements OnInit {
    @ViewChild('sidenav')
    public sidenav:MdSidenav;

    public notificationOptions = NOTIFICATION_OPTIONS;
    public sidenavMode:string = 'side';

    constructor(public router:Router,
                public translate:TranslateService,
                public sidebarService:SidebarService,
                public tokenService:TokenService) {
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
        this.sidebarService.sidenav = this.sidenav;
        //EventService.addEvent('closeSidenav', (event) => alert());
    }
}
