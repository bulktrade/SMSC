import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TokenService } from '../services/auth/token.service';
import { NOTIFICATION_OPTIONS } from '../common/notificationOptions';
import { LoadingRouterOutletService } from '../services/loading/loadingRouterOutlet.service';
import { LoadingGridService } from '../services/loading/loadingGrid.service';
import { MdSidenav } from "@angular2-material/sidenav";
import { SidebarService } from "../sidebar/sidebarService";

@Component({
    selector: 'navigation',
    providers: [],
    template: require('./navigation.html'),
    styleUrls: [
        require('./navigation.scss')
    ]
})

export class Navigation implements OnInit {
    @ViewChild('sidenav')
    public sidenav:MdSidenav;

    public notificationOptions = NOTIFICATION_OPTIONS;

    constructor(public router: Router,
                public translate: TranslateService,
                public tokenService: TokenService,
                public loadingROService: LoadingRouterOutletService,
                public service: LoadingGridService,
                public sidebarService:SidebarService) {

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                loadingROService.start();
            }

            if (event instanceof NavigationEnd) {
                loadingROService.stop();
            }
        });
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
        console.log(this.sidenav);
        this.sidebarService.sidenav = this.sidenav;
    }
}
