import {LocalStorageService} from 'angular2-localStorage/LocalStorageEmitter';
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { DIRECTIVES, PIPES, PROVIDERS } from '../platform/browser';
import { ENV_PROVIDERS } from '../platform/environment';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import {
    TRANSLATE_PROVIDERS,
    TranslateService
} from 'ng2-translate/ng2-translate';
import { provide } from '@angular/core';
import { ODatabaseService } from './orientdb/orientdb.service';
import {MdIconRegistry} from '@angular2-material/icon/icon-registry';

export const APP_PROVIDERS = [
  AppState,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    LocalStorageService,
    MdIconRegistry,
    provide(ODatabaseService, {
        useFactory: () => new ODatabaseService('/orientdb/smsc')
    }),
    TRANSLATE_PROVIDERS,
    TranslateService,
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES
];
