import { Http } from "@angular/http";
import {
    TranslateService,
    TranslateLoader,
    TranslateStaticLoader,
} from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { TokenService } from "../../services/auth/token.service";
import { COMMON_PROVIDERS } from "../../common/index";
import { NotificationService } from "../../services/notificationService";
import { NotificationsService } from "angular2-notifications/components";
import { LoadingGridService } from "../../services/loadingGrid.service";
import { ConfigServiceMock } from "../../common/mock/configServiceMock";
import { ConfigService } from "../../config/configService";

class MockActivatedRoute {};

export const CRUD_PROVIDERS = [
    ...COMMON_PROVIDERS,
    { provide: ConfigService, useClass: ConfigServiceMock },
    LoadingGridService,
    NotificationsService,
    NotificationService,
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
    { provide: Router, useClass: MockActivatedRoute },
    CrudService,
    TokenService,
    TranslateService,
    {
        provide: TranslateLoader, useFactory: (http: Http, configService: ConfigService) => {
        return new TranslateStaticLoader(http, configService.config.i18nPath, '.json');
        }, deps: [Http, ConfigService]
    }
];
