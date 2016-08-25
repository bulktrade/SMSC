import { Component, ViewEncapsulation } from "@angular/core";
import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
    selector: 'app',
    pipes: [TranslatePipe],
    providers: [],
    directives: [ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        require('normalize.css/normalize.css'),
        require('webpack-material-design-icons/material-design-icons.css'),
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-material.css'),
        require('bootstrap-material-design/dist/css/bootstrap-material-design.css'),
        require('ng2-select/components/css/ng2-select.css')
    ],
    styles: [
        require('./app.scss')
    ]
})

export class App {
    url = 'http://www.smsc.io/';

    constructor(translate:TranslateService) {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(de|ru|en)/gi.test(userLang) ? userLang : 'en';

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}

