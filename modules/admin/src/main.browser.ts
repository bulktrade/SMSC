import { bootstrap } from '@angular/platform-browser-dynamic';
import { App, APP_PROVIDERS } from './app';
import {LocalStorageSubscriber} from "angular2-localStorage/LocalStorageEmitter";

var appPromise = bootstrap(App, [
  ...APP_PROVIDERS
]);

LocalStorageSubscriber(appPromise);

