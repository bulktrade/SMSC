// App
export * from './app.component';
export * from './app.service';

import { provide } from '@angular/core';
import { Http } from '@angular/http';

import { AppState } from './app.service';

// https://github.com/ocombe/ng2-translate
import {
    TranslateService,
    TranslateLoader,
    TranslateStaticLoader
} from 'ng2-translate/ng2-translate';

export const APP_PROVIDERS = [
    AppState,
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    TranslateService
];
