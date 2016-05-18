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
/// <reference path="./assets/js/ExtJS.d.ts" />
/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';

/*
 * App Component
 * our top level component that holds all of our components
 */
import { App, APP_PROVIDERS } from './app';
import {LocalStorageSubscriber} from "../dist/assets/js/angular2-localstorage/LocalStorageEmitter";

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */

var appPromise = bootstrap(App, [
  ...APP_PROVIDERS
]);

LocalStorageSubscriber(appPromise);

/*export function main(initialHmrState?: any): Promise<any> {

  var appPromise = bootstrap(App, [
    ...APP_PROVIDERS
  ])
      .catch(err => console.error(err));
  LocalStorageSubscriber(appPromise);

  return appPromise;
}*/


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
/*if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}*/
