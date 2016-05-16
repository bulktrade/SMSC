// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';

import { HTTP_PROVIDERS, Http } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import {
    TranslateLoader,
    TranslateStaticLoader,
    TRANSLATE_PROVIDERS,
    TranslateService
} from 'ng2-translate/ng2-translate';
import { provide } from '@angular/core';
import { ODatabaseService } from './orientdb/orientdb.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    provide(ODatabaseService, {
        useFactory: () => new ODatabaseService('http://localhost:3000/orientdb/smsc'),
    }),
    TRANSLATE_PROVIDERS,
    TranslateService
];
