import { Component, OnInit, ViewChild, animate, style, trigger, transition, state } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TokenService } from '../services/auth/token.service';
import { NOTIFICATION_OPTIONS } from '../common/notification-Options';
import { LoadingRouterOutletService } from '../services/loading/loading-router-outlet.service';
import { LoadingGridService } from '../services/loading/loading-grid.service';
import { MdSidenav } from '@angular2-material/sidenav';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
    selector: 'navigation',
    providers: [],
    template: require('./navigation.component.html'),
    animations: [
        trigger('state', [
            state('closed', style({ height: 0 })),
            state('open', style({ height: '*' })),
            transition('closed => open', [animate('200ms ease-out')]),
            transition('open => closed', [animate('200ms ease-out')])
        ]),
    ],
    styleUrls: [
        require('./navigation.component.scss'),
        require('./simple-sidebar.scss')
    ]
})

export class NavigationComponent implements OnInit {
    @ViewChild('sidenav')
    public sidenav: MdSidenav;

    public notificationOptions = NOTIFICATION_OPTIONS;
    public openedSidenav: boolean;

    constructor(public router: Router,
                public translate: TranslateService,
                public tokenService: TokenService,
                public loadingROService: LoadingRouterOutletService,
                public service: LoadingGridService,
                public sidebarService: SidebarService) {

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
        let minWidth: number = 992;

        if (width < minWidth) {
            this.openedSidenav = false;
        } else {
            this.openedSidenav = true;
        }

        this.sidebarService.sidenav = this.sidenav;
    }
}
