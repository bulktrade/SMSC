import {LocalStorageService} from 'angular2-localStorage/LocalStorageEmitter';
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {
    TRANSLATE_PROVIDERS,
    TranslateService
} from 'ng2-translate/ng2-translate';
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { ODatabaseService } from './orientdb/orientdb.service';
import {MdIconRegistry} from '@angular2-material/icon/icon-registry';

import { AuthGuard } from './login/login.guard';

export const APP_PROVIDERS = [
    AuthGuard,
    AppState,
    HTTP_PROVIDERS,
    ROUTER_DIRECTIVES,
    LocalStorageService,
    MdIconRegistry,
    provide(ODatabaseService, {
        useFactory: () => new ODatabaseService('/orientdb/smsc')
    }),
    TRANSLATE_PROVIDERS,
    TranslateService
];
