import { bootstrap } from '@angular/platform-browser-dynamic';
import { App, APP_PROVIDERS } from './app';
import {LocalStorageSubscriber} from 'angular2-localStorage/LocalStorageEmitter';

let appPromise = bootstrap(App, [
  ...APP_PROVIDERS
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