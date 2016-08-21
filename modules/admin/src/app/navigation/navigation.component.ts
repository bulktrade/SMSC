import { Component, OnInit } from "@angular/core";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { ShowMiniNav } from "../sidebar/ShowMiniNav";
import { Sidebar } from "../sidebar/sidebar.component";
import { Router } from "@angular/router";
import { TokenService } from "../services/auth/token.service";
import { LoadingRouterOutlet } from "../common/loadingRouterOutlet";
import { NotificationsService } from "angular2-notifications/components";
import { NOTIFICATION_OPTIONS } from "../common/notificationOptions";

@Component({
    selector: 'navigation',
    providers: [ ShowMiniNav ],
    template: require('./navigation.html'),
    styles: [
        require('./navigation.scss')
    ],
    directives: [
        LoadingRouterOutlet,
        Sidebar
    ],
    pipes: [ TranslatePipe ],
})

export class Navigation implements OnInit {
    public notificationOptions = NOTIFICATION_OPTIONS;

    constructor(public router:Router,
                public translate:TranslateService,
                public showmininav:ShowMiniNav,
                public tokenService:TokenService) {
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
    }
}
