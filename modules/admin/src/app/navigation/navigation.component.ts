import { Component, OnInit, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TokenService } from '../services/auth/token.service';
import { NOTIFICATION_OPTIONS } from '../common/notificationOptions';
import { LoadingRouterOutletService } from '../services/loading/loadingRouterOutlet.service';
import { LoadingGridService } from '../services/loading/loadingGrid.service';
import { ViewChild } from "@angular/core/src/metadata/di";
import { MdSidenav } from "@angular2-material/sidenav";

@Component({
    selector: 'navigation',
    providers: [],
    template: require('./navigation.html'),
    styleUrls: [
        require('./navigation.scss')
    ]
})

export class Navigation implements OnInit {
    public notificationOptions = NOTIFICATION_OPTIONS;
    public openedSidenav: boolean;

    constructor(public router: Router,
                public translate: TranslateService,
                public tokenService: TokenService,
                public loadingROService: LoadingRouterOutletService,
                public service: LoadingGridService) {

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                loadingROService.start();
            }

            if (event instanceof NavigationEnd) {
                loadingROService.stop();
            }
        });
    }

    ngOnInit() {
        this.hideSidenavInitiallyOnMobileDevice(window.innerWidth);
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }

    hideSidenavInitiallyOnMobileDevice(width: number) {
        let windowWidth: number = width;
        let minWidth: number = 992;

        if (windowWidth < minWidth) {
            this.openedSidenav = false;
        } else {
            this.openedSidenav = true;
        }
    }
}
