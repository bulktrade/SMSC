import {Component, ViewEncapsulation} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import { NotFound } from './notfound/notfound.component';
import { Login } from './login/login.component';
import { Navigation } from './navigation/navigation.component';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

require('./app.scss');
require('npm-font-open-sans/open-sans.css');
require('../../node_modules/ag-grid/dist/styles/ag-grid.css');
require('../../node_modules/ag-grid/dist/styles/theme-fresh.css');

@Component({
    selector: 'app',
    pipes: [TranslatePipe],
    providers: [],
    directives: [ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None
})

@RouteConfig([
    { path: '/', redirectTo: ['/Login'] },
    { path: '/login', component: Login, name: 'Login', useAsDefault: true },
    { path: '/navigation/...', component: Navigation, name: 'Navigation' },
    { path: '/notfound', component: NotFound, name: 'NotFound' },
    { path: '**', redirectTo: ['/NotFound'] }
])

export class App {
    constructor(translate:TranslateService) {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(de|ru|en)/gi.test(userLang) ? userLang : 'en';

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}

