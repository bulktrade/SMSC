import { Http } from '@angular/http';
import {
    TranslateService,
    TranslateLoader,
    TranslateStaticLoader,
} from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router, NavigationExtras, UrlTree } from '@angular/router';
import { Location } from '@angular/common';
import { CrudService } from '../crud.service';
import { TokenService } from '../../services/auth/token.service';
import { COMMON_PROVIDERS } from '../../common/index';
import { NotificationService } from '../../services/notification-service';
import { NotificationsService } from 'angular2-notifications/components';
import { LoadingGridService } from '../../services/loading/loading-grid.service';
import { ConfigService } from '../../config/config.service';
import { RouterOutletService } from '../../services/router-outlet-service';
import { GridService } from '../../services/grid.service';
import { BackendService } from "../../services/backend/backend.service";
import { CrudViewService } from "../crud-view/crud-view.service";
import { CrudLevelService } from "../services/crud-level";

class MockActivatedRoute {
    navigateByUrl(url: string | UrlTree, extras?: NavigationExtras) {};
    navigate(commands: any[], extras?: NavigationExtras) {};
}

export const CRUD_PROVIDERS = [
    ...COMMON_PROVIDERS,
    BackendService,
    CrudLevelService,
    CrudViewService,
    LoadingGridService,
    GridService,
    RouterOutletService,
    NotificationsService,
    NotificationService,
    CrudService,
    TokenService,
    { provide: Location, useClass: MockActivatedRoute },
    TranslateService,
    ConfigService,
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
    { provide: Router, useClass: MockActivatedRoute },
    {
        provide: TranslateLoader, useFactory: (http: Http, configService: ConfigService) => {
        return new TranslateStaticLoader(http, configService.config.i18nPath, '.json');
    }, deps: [Http, ConfigService]
    }
];
