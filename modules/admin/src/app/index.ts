import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
import {AppState} from "./app.service";
import {HTTP_PROVIDERS} from "@angular/http";
import {TRANSLATE_PROVIDERS, TranslateService} from "ng2-translate/ng2-translate";
import {DashboardGuard} from "./dashboard/dashboard.guard";
import {COMMON_PROVIDERS} from "./common";
import {AuthService} from "./services/auth/auth.service";
import {TokenService} from "./services/auth/token.service";
import {CrudResolve} from "./crud/common/crudResolve";
import {CrudService} from "./crud/crud.service";
import {AuthGuard} from "./common/authGuard";

export * from './app.component';
export * from './app.service';

export const APP_PROVIDERS = [
    CrudResolve,
    CrudService,
    TokenService,
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
