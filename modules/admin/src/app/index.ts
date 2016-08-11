import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";
import { AppState } from "./app.service";
import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions } from "@angular/http";
import { TRANSLATE_PROVIDERS, TranslateService } from "ng2-translate/ng2-translate";
import { provide } from "@angular/core";
import { ODatabaseService } from "./orientdb/orientdb.service";
import { DashboardGuard } from "./dashboard/dashboard.guard";
import { COMMON_PROVIDERS } from "./common";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { AuthService } from "./services/auth/auth.service";
import { TokenService, AUTH_TOKEN_NAME } from "./services/auth/token.service";
import { Router } from "@angular/router";
import { CrudResolve } from "./crud/common/crudResolve";
import { LoadingService } from "./services/loading.service";
import { CrudService } from "./crud/crud.service";
import {AuthGuard} from "./common/authGuard";

export * from './app.component';
export * from './app.service';

export const APP_PROVIDERS = [
    CrudResolve,
    CrudService,
    TokenService,
    LoadingService,
    AuthService,
    AuthGuard,
    DashboardGuard,
    AppState,
    HTTP_PROVIDERS,
    LocalStorageService,
    TRANSLATE_PROVIDERS,
    TranslateService,
    ...COMMON_PROVIDERS
];
