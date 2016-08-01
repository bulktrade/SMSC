import { bootstrap } from '@angular/platform-browser-dynamic';
import { App, APP_PROVIDERS } from './app';
import { LocalStorageSubscriber } from 'angular2-localstorage/LocalStorageEmitter';

import {
    TranslateLoader,
    TranslateStaticLoader
} from 'ng2-translate/ng2-translate';
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { Http } from '@angular/http';

import {disableDeprecatedForms, provideForms, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';
import { appRouterProviders } from "./app/app.routes";

let appPromise = bootstrap(App, [
    ...APP_PROVIDERS,
    ...PLATFORM_PROVIDERS,
    ...ENV_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    {
          provide: PLATFORM_DIRECTIVES,
          useValue: [REACTIVE_FORM_DIRECTIVES],
          multi: true
    },
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
        deps: [Http]
    }),
    appRouterProviders
]);

LocalStorageSubscriber(appPromise);

export function main(initialHmrState?: any): Promise<any> {
  return appPromise;
}

/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
