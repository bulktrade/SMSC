import { Component, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { ShowMiniNav } from "../sidebar/ShowMiniNav";
import { Router } from "@angular/router";
import { TokenService } from "../services/auth/token.service";
import { NOTIFICATION_OPTIONS } from "../common/notificationOptions";

@Component({
    selector: 'navigation',
    providers: [ShowMiniNav],
    template: require('./navigation.html'),
    styles: [
        require('./navigation.scss')
    ]
})

export class Navigation implements OnInit {
    public notificationOptions = NOTIFICATION_OPTIONS;

    constructor(public router: Router,
                public translate: TranslateService,
                public showmininav: ShowMiniNav,
                public tokenService: TokenService) {
    }

    logout() {
        this.tokenService.resetToken();
        this.router.navigateByUrl('/login');
    }

    ngOnInit() {
    }
}
