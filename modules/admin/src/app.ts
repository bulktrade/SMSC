import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Authentication} from './app/components/authentication/authentication';
import {LocalStorageSubscriber, LocalStorageService} from './assets/js/angular2-localstorage/LocalStorageEmitter';
import {
    TranslateLoader,
    TranslateStaticLoader,
    TRANSLATE_PROVIDERS,
    TranslateService
} from 'ng2-translate/ng2-translate';
import {provide} from 'angular2/core';
import {ODatabaseService} from './Service/OrientDB.service';

let appPromise = bootstrap(Authentication, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    LocalStorageService,
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    provide(ODatabaseService, {
        useFactory: () => new ODatabaseService('http://localhost:3000/orientdb/smsc'),
    }),
    TRANSLATE_PROVIDERS,
    TranslateService
]);

LocalStorageSubscriber(appPromise);
