import { Http } from "@angular/http";
import {
    TranslateService, TranslateLoader, TranslateStaticLoader,
} from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { TokenService } from "../../services/auth/token.service";
import { COMMON_PROVIDERS } from "../../common/index";
import { NotificationService } from "../../services/notificationService";
import { NotificationsService } from "angular2-notifications/components";
import { LoadingGridService } from "../../services/loadingGrid.service";

class MockActivatedRoute {};

export const CRUD_PROVIDERS = [
    LoadingGridService,
    NotificationsService,
    NotificationService,
    ...COMMON_PROVIDERS,
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
    { provide: Router, useClass: MockActivatedRoute },
    CrudService,
    TokenService,
    TranslateService,
    {
        provide: TranslateLoader, useFactory: (http: Http) => {
            new TranslateStaticLoader(http, (typeof PUBLIC_PATH !== 'undefined' ? PUBLIC_PATH : '') + 'assets/i18n', '.json');
        }, deps: [Http]
    }
];
