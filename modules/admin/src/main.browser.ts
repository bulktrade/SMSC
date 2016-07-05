import { bootstrap } from '@angular/platform-browser-dynamic';
import { App, APP_PROVIDERS } from './app';
import { LocalStorageSubscriber } from 'angular2-localStorage/LocalStorageEmitter';

import {
    TranslateLoader,
    TranslateStaticLoader
} from 'ng2-translate/ng2-translate';
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { Http } from '@angular/http';

import {disableDeprecatedForms, provideForms, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

let appPromise = bootstrap(App, [
    disableDeprecatedForms(),
    provideForms(),
    {
          provide: PLATFORM_DIRECTIVES,
          useValue: [REACTIVE_FORM_DIRECTIVES],
          multi: true
    },
    ...APP_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
        deps: [Http]
    }),
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
