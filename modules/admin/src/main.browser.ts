import { bootstrap } from '@angular/platform-browser-dynamic';
import { App, APP_PROVIDERS } from './app';
import {LocalStorageSubscriber} from "../dist/assets/js/angular2-localstorage/LocalStorageEmitter";

var appPromise = bootstrap(App, [
  ...APP_PROVIDERS
]);

LocalStorageSubscriber(appPromise);

