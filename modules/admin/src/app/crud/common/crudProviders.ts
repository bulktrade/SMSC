import { Http, HTTP_PROVIDERS } from "@angular/http";
import { provide } from "@angular/core";
import {
    TranslateService, TranslateLoader, TranslateStaticLoader,
    TRANSLATE_PROVIDERS
} from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { TokenService } from "../../services/auth/token.service";
import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";
import { COMMON_PROVIDERS } from "../../common/index";
import { ServiceNotifications } from "../../services/serviceNotification";
import { NotificationsService } from "angular2-notifications/components";
import { LoadingGridService } from "../../services/loadingGrid.service";

class MockActivatedRoute {};

export const CRUD_PROVIDERS = [
    LoadingGridService,
    NotificationsService,
    ServiceNotifications,
    ...COMMON_PROVIDERS,
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
    { provide: Router, useClass: MockActivatedRoute },
    CrudService,
    HTTP_PROVIDERS,
    TokenService,
    TranslateService,
    LocalStorageService,
    TRANSLATE_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (http:Http) => new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json'),
        deps: [ Http ]
    }),
];
