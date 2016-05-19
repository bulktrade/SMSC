/*
import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app/app.component';
import {APP_PROVIDERS} from "./app/index";

// let appPromise = bootstrap(Authentication, [

export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(App, APP_PROVIDERS)
      .catch(err => console.error(err));
}



// LocalStorageSubscriber(appPromise);


if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
*/

import { bootstrap } from '@angular/platform-browser-dynamic';
import { App, APP_PROVIDERS } from './app';
import {LocalStorageSubscriber} from "../dist/assets/js/angular2-localstorage/LocalStorageEmitter";

var appPromise = bootstrap(App, [
  ...APP_PROVIDERS
]);

LocalStorageSubscriber(appPromise);

