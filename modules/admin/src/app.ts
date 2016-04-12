import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Authentication} from './app/components/authentication/authentication';
import {
    TranslateLoader,
    TranslateStaticLoader,
    TRANSLATE_PROVIDERS,
    TranslateService
} from 'ng2-translate/ng2-translate';
import {provide} from 'angular2/core';
import {ODatabaseService} from "./Service/OrientDB.service";

bootstrap(Authentication, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http:Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }),
    TRANSLATE_PROVIDERS,
    TranslateService,
    ODatabaseService
])
  .catch(err => console.error(err));