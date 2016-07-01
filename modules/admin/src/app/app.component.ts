import { Component, ViewEncapsulation } from "@angular/core";
import { RouteConfig } from "@angular/router-deprecated";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { AppRouterOutlet } from "./app.router-outlet";
import { NotFound } from "./notfound/notfound.component";
import { Login } from "./login/login.component";
import { Navigation } from "./navigation/navigation.component";

@Component({
    selector: 'app',
    pipes: [TranslatePipe],
    providers: [],
    directives: [AppRouterOutlet],
    template: '<route-outlet></route-outlet>',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        require('./app.scss'),
        require('npm-font-open-sans/open-sans.css')
        // require('../vendor/ext-6.0.1/build/classic/theme-classic/resources/theme-classic-all.css'),
        // require('../vendor/iconfont/material-icons.css')
    ]
})
@RouteConfig([
    { path: '/', redirectTo: ['/Login'] },
    { path: '/login', component: Login, name: 'Login', useAsDefault: true },
    { path: '/navigation/...', component: Navigation, name: 'Navigation' },
    { path: '/notfound', component: NotFound, name: 'NotFound' },
    { path: '*', redirectTo: ['/NotFound'] }
])
export class App {
    constructor(translate: TranslateService) {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(de|ru|en)/gi.test(userLang) ? userLang : 'en';

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}

