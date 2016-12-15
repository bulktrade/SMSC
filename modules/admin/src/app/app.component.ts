import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { NOTIFICATION_OPTIONS } from "./common/notification-Options";

@Component({
    selector: 'app',
    providers: [],
    template: `
        <simple-notifications id="growl" [options]="notificationOptions"></simple-notifications>
        <router-outlet></router-outlet>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        require('normalize.css/normalize.css'),
        require('webpack-material-design-icons/material-design-icons.css'),
        require('font-awesome/css/font-awesome.css'),
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-fresh.css'),
        require('./app.component.scss'),
        require('./common/spinner/cube-grid/cube-grid.component.scss'),
        require('primeng/resources/themes/omega/theme.css'),
        require('primeng/resources/primeng.min.css')
    ]
})
export class App {
    public notificationOptions = NOTIFICATION_OPTIONS;

    constructor(private translate: TranslateService) {
        let userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(de|ru|en)/gi.test(userLang) ? userLang : 'en';

        // this language will be used as a fallback when a translation isn't found
        // in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}

