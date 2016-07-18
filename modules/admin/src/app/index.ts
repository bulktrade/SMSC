import { LocalStorageService } from "angular2-localStorage/LocalStorageEmitter";
import { AppState } from "./app.service";
import { HTTP_PROVIDERS, Http } from "@angular/http";
import { TRANSLATE_PROVIDERS, TranslateService } from "ng2-translate/ng2-translate";
import { provide } from "@angular/core";
import { ODatabaseService } from "./orientdb/orientdb.service";
import { MdIconRegistry } from "@angular2-material/icon/icon-registry";
import { DashboardGuard } from "./dashboard/dashboard.guard";
import { AuthGuard } from "./common/authGuard";

export * from './app.component';
export * from './app.service';

export const APP_PROVIDERS = [
    AuthGuard,
    DashboardGuard,
    AppState,
    HTTP_PROVIDERS,
    LocalStorageService,
    MdIconRegistry,
    provide(ODatabaseService, {
        useFactory: (http:Http) => new ODatabaseService('/orientdb/smsc', http),
        deps: [ Http ]
    }),
    TRANSLATE_PROVIDERS,
    TranslateService
];
