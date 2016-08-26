import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";
import { AppState } from "./app.service";
import { HTTP_PROVIDERS } from "@angular/http";
import { TRANSLATE_PROVIDERS, TranslateService } from "ng2-translate/ng2-translate";
import { DashboardGuard } from "./dashboard/dashboard.guard";
import { COMMON_PROVIDERS } from "./common";
import { AuthService } from "./services/auth/auth.service";
import { TokenService } from "./services/auth/token.service";
import { CrudService } from "./crud/crud.service";
import { AuthGuard } from "./common/authGuard";
import { ServiceNotifications } from "./services/serviceNotification";
import { LoadingGridService } from "./services/loadingGrid.service";
import { CrudResolve } from "./crud/common/crudResolve";
import { CrudViewResolve } from "./crud/crudView/crud.view.resolve";
import { CrudLinksetResolve } from "./crud/crudLinkset/crud.linkset.resolve";
import { CrudCreateResolve } from "./crud/crudCreate/crud.create.resolve";
import { CrudEditResolve } from "./crud/crudEdit/crud.edit.resolve";

export * from './app.component';
export * from './app.service';

export const APP_PROVIDERS = [
    CrudEditResolve,
    CrudCreateResolve,
    CrudLinksetResolve,
    CrudResolve,
    CrudViewResolve,
    LoadingGridService,
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
    ServiceNotifications,
    ...COMMON_PROVIDERS
];
