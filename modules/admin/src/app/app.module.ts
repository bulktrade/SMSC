import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App, APP_PROVIDERS } from '../app';
import {
    TranslateLoader,
    TranslateStaticLoader
} from 'ng2-translate/ng2-translate';
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { Http } from '@angular/http';

import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

import { PLATFORM_PROVIDERS } from '../platform/browser';
import { ENV_PROVIDERS } from '../platform/environment';
import { appRouterProviders } from "../app/app.routes";
import {DeprecatedFormsModule} from "@angular/common";


@NgModule({
    imports: [ BrowserModule, DeprecatedFormsModule ],
    providers: [
        ...APP_PROVIDERS,
        ...PLATFORM_PROVIDERS,
        ...ENV_PROVIDERS,
        {
            provide: PLATFORM_DIRECTIVES,
            useValue: [REACTIVE_FORM_DIRECTIVES],
            multi: true
        },
        provide(TranslateLoader, {
            useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
            deps: [Http]
        }),
        appRouterProviders,
    ],
    declarations: [ App ],
    bootstrap:    [ App ]
})
export class AppModule { }