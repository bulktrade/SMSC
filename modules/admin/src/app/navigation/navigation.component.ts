import {Component, animate, style, trigger, transition, state, OnInit} from "@angular/core";
import {Router, NavigationStart, NavigationEnd} from "@angular/router";
import {TokenService} from "../services/auth/token.service";
import {LoadingRouterOutletService} from "../services/loading/loading-router-outlet.service";

@Component({
    selector: 'navigation',
    providers: [],
    templateUrl: './navigation.component.html',
    animations: [
        trigger('state', [
            state('closed', style({height: 0})),
            state('open', style({height: '*'})),
            transition('closed => open', [animate('200ms ease-out')]),
            transition('open => closed', [animate('200ms ease-out')])
        ]),
    ],
    styleUrls: [
        './navigation.component.scss',
        './simple-sidebar.scss'
    ]
})

export class NavigationComponent implements OnInit {
    public toggleUpSidebar: boolean = false;
    public toggleLeftSidebar: boolean = false;

    constructor(public router: Router,
                public tokenService: TokenService,
                public loadingROService: LoadingRouterOutletService) {
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.loadingROService.start();
            }

            if (event instanceof NavigationEnd) {
                this.loadingROService.stop();
            }
        });
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }
}
