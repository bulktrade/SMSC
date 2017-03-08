import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {NOTIFICATION_OPTIONS} from "./shared/notification-options";

@Component({
    selector: 'app',
    template: `
        <simple-notifications style="z-index:999999" id="growl" [options]="notificationOptions"></simple-notifications>
        <router-outlet></router-outlet>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public notificationOptions = NOTIFICATION_OPTIONS;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
        let userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(de|ru|en)/gi.test(userLang) ? userLang : 'en';

        // this language will be used as a fallback when a translation isn't found
        // in the current language
        this.translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(userLang);
    }
}

